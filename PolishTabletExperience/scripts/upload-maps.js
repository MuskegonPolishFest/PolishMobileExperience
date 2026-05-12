const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load token from studio-mpf/.env
const envPath = path.join(__dirname, '../studio-mpf/.env');
dotenv.config({ path: envPath });

const STUDIO_PATH = path.join(__dirname, '../studio-mpf');
const MAPS_PATH = path.join(__dirname, '../assets/maps_svg');
const SITE_SETTINGS_ID = 'db78a746-7ac3-4736-8e6f-5a848e9d2ccd';

const client = createClient({
  projectId: 'zfw2xsde',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-12',
  token: process.env.SANITY_API_TOKEN,
});

async function uploadMaps() {
  console.log('Starting map upload to Sanity...');

  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN not found in .env file');
    return;
  }

  if (!fs.existsSync(MAPS_PATH)) {
    console.error(`❌ Error: Maps directory not found at ${MAPS_PATH}`);
    return;
  }

  const files = fs.readdirSync(MAPS_PATH).filter(f => f.endsWith('.svg'));
  console.log(`Found ${files.length} map files.`);

  const uploadedAssets = {};

  for (const file of files) {
    const yearMatch = file.match(/(\d{4})/);
    if (!yearMatch) continue;

    const year = parseInt(yearMatch[1], 10);
    if (uploadedAssets[year]) continue;

    const filePath = path.join(MAPS_PATH, file);
    console.log(`Uploading ${file} (Year: ${year})...`);

    try {
      const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
        filename: file,
        contentType: 'image/svg+xml',
      });
      uploadedAssets[year] = asset._id;
      console.log(`✅ Uploaded ${file} -> ${asset._id}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${file}:`, error.message);
    }
  }

  if (Object.keys(uploadedAssets).length === 0) {
    console.log('No new maps were uploaded. Exiting.');
    return;
  }

  console.log('\nUpdating Site Settings document with asset references...');

  try {
    const currentSettings = await client.getDocument(SITE_SETTINGS_ID);
    if (!currentSettings) {
      throw new Error(`Site settings document ${SITE_SETTINGS_ID} not found`);
    }

    const updatedMaps = currentSettings.globalMaps.map(item => {
      const assetId = uploadedAssets[item.startYear];
      if (assetId) {
        return {
          ...item,
          mapAsset: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetId
            }
          }
        };
      }
      return item;
    });

    await client.patch(SITE_SETTINGS_ID)
      .set({ globalMaps: updatedMaps })
      .unset(['globalMaps[].source']) // Clean up the incorrect field
      .commit();
    
    console.log('✅ Site Settings updated successfully!');
  } catch (error) {
    console.error('❌ Failed to update Site Settings:', error.message);
  }

  console.log('\nSyncing local content...');
  // Running sync-content.js via require to keep it in the same process and avoid path issues
  const { execSync } = require('child_process');
  execSync('node scripts/sync-content.js', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
}

uploadMaps().catch(console.error);
