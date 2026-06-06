const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'zfw2xsde',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function run() {
  console.log("Fetching schemas in use...");
  const types = await client.fetch(`array::unique(*._type)`);
  console.log("Document types in DB:", types);

  const eras = await client.fetch(`*[_type == "era"]`);
  console.log("Era documents:", JSON.stringify(eras, null, 2));
}

run().catch(console.error);
