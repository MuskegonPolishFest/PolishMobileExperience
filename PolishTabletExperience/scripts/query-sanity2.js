const { createClient } = require('@sanity/client');
const fs = require('fs');

const client = createClient({
  projectId: 'zfw2xsde',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function run() {
  const types = await client.fetch(`array::unique(*._type)`);
  fs.writeFileSync('scripts/sanity-types.json', JSON.stringify(types, null, 2), 'utf8');

  const eras = await client.fetch(`*[_type == "era"]`);
  fs.writeFileSync('scripts/sanity-eras.json', JSON.stringify(eras, null, 2), 'utf8');
}

run().catch(console.error);
