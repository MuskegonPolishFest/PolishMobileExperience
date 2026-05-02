const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');

dotenv.config();

const client = createClient({
  projectId: 'zfw2xsde',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function fixSlugs() {
  console.log('Fetching all POI documents...');
  
  // Fetch all POIs
  const pois = await client.fetch(`*[_type == "poi"] { _id, id }`);
  
  // Filter for those where 'id' is a string
  const invalidPois = pois.filter(poi => typeof poi.id === 'string');
  
  console.log(`Found ${invalidPois.length} documents to fix.`);

  if (invalidPois.length === 0) {
    console.log('No documents needed fixing.');
    return;
  }

  const transaction = client.transaction();

  for (const poi of invalidPois) {
    console.log(`Fixing document ${poi._id} (id: ${poi.id})...`);
    transaction.patch(poi._id, {
      set: {
        id: {
          _type: 'slug',
          current: poi.id
        }
      }
    });
  }

  if (pois.length > 0) {
    await transaction.commit();
    console.log('✅ Successfully converted all IDs to slugs!');
  } else {
    console.log('No documents needed fixing.');
  }
}

fixSlugs().catch(console.error);
