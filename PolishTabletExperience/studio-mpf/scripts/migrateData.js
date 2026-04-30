const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// We need to read the TS files. But requiring them directly is hard because of the `require("../assets/...")` calls.
// Instead of complex AST parsing, we will use a clever workaround:
// We override Node's require ONLY for .png files to return the absolute path to the file.
require.extensions['.png'] = function (module, filename) {
  module.exports = filename;
};
require.extensions['.jpg'] = function (module, filename) {
  module.exports = filename;
};

// Now we can safely import the content constants
const { POI_DETAILS, MOCK_CARDS } = require('../dist/contentData');
const { HOTSPOT_POSITIONS } = require('../dist/hotspotPositions');

const client = createClient({
  projectId: 'zfw2xsde',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function migrate() {
  console.log('Starting migration...');

  // Combine data into a single POI array
  const pois = Object.values(POI_DETAILS).map((detail) => {
    const card = MOCK_CARDS.find((c) => c.id === detail.id);
    const hotspot = HOTSPOT_POSITIONS[detail.id];
    return {
      _id: `poi-${detail.id}`,
      _type: 'poi',
      id: detail.id,
      eraKeys: detail.eraKeys,
      yearLabel: detail.yearLabel,
      titleTop: detail.titleTop,
      titleBottom: card ? card.titleBottom : detail.titleTop,
      description: detail.description,
      summary: detail.summary || '',
      relatedIds: detail.relatedIds || [],
      hotspot: hotspot ? { top: hotspot.top, left: hotspot.left } : undefined,
      // We will handle images separately
      _localImagePath: detail.mainImage || (card ? card.imageUri : null),
    };
  });

  console.log(`Found ${pois.length} POIs to migrate.`);

  // Upload images and create docs
  for (const poi of pois) {
    try {
      console.log(`Processing POI: ${poi.id}`);
      let imageAssetRef = null;

      if (poi._localImagePath && typeof poi._localImagePath === 'string' && fs.existsSync(poi._localImagePath)) {
        console.log(`Uploading image for ${poi.id}...`);
        const imageFile = fs.createReadStream(poi._localImagePath);
        const asset = await client.assets.upload('image', imageFile, {
          filename: path.basename(poi._localImagePath),
        });
        imageAssetRef = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        };
      }

      // Create or replace the document
      const docToCreate = {
        ...poi,
        mainImage: imageAssetRef,
      };
      
      // Remove our temporary local path property
      delete docToCreate._localImagePath;

      await client.createOrReplace(docToCreate);
      console.log(`✅ Successfully created/updated POI: ${poi.id}`);
    } catch (error) {
      console.error(`❌ Failed to process POI ${poi.id}:`, error);
    }
  }

  console.log('🎉 Migration completed!');
}

migrate().catch(console.error);
