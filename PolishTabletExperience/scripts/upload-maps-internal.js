import fs from 'fs'
import path from 'path'
import { getCliClient } from 'sanity/cli'

const MAPS_PATH = path.join(process.cwd(), '../assets/maps_svg')
const SITE_SETTINGS_ID = 'db78a746-7ac3-4736-8e6f-5a848e9d2ccd'

async function uploadMaps() {
  const client = getCliClient({ apiVersion: '2024-03-12' })
  console.log('Starting map upload to Sanity via sanity exec...')

  if (!fs.existsSync(MAPS_PATH)) {
    console.error(`Error: Maps directory not found at ${MAPS_PATH}`)
    return
  }

  const files = fs.readdirSync(MAPS_PATH).filter(f => f.endsWith('.svg'))
  console.log(`Found ${files.length} map files.`)

  const uploadedAssets = {}

  for (const file of files) {
    const yearMatch = file.match(/(\d{4})/)
    if (!yearMatch) continue

    const year = parseInt(yearMatch[1], 10)
    if (uploadedAssets[year]) continue

    const filePath = path.join(MAPS_PATH, file)
    console.log(`Uploading ${file} (Year: ${year})...`)

    try {
      const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
        filename: file
      })
      uploadedAssets[year] = asset._id
      console.log(`✅ Uploaded ${file} -> ${asset._id}`)
    } catch (error) {
      console.error(`❌ Failed to upload ${file}:`, error.message)
    }
  }

  if (Object.keys(uploadedAssets).length === 0) {
    console.log('No maps were uploaded. Exiting.')
    return;
  }

  console.log('\nUpdating Site Settings document...')
  
  try {
    const currentSettings = await client.getDocument(SITE_SETTINGS_ID)
    if (!currentSettings) {
      throw new Error(`Site settings document ${SITE_SETTINGS_ID} not found`)
    }

    const updatedMaps = currentSettings.globalMaps.map(item => {
      const assetId = uploadedAssets[item.startYear]
      if (assetId) {
        return {
          ...item,
          source: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetId
            }
          }
        }
      }
      return item
    })

    await client.patch(SITE_SETTINGS_ID)
      .set({ globalMaps: updatedMaps })
      .commit()
    
    console.log('✅ Site Settings updated successfully!')
  } catch (error) {
    console.error('❌ Failed to update Site Settings:', error.message)
  }
}

uploadMaps().catch(console.error)
