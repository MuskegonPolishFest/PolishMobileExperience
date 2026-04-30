import { createClient } from '@sanity/client';

export const client = createClient({
    projectId: 'zfw2xsde',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
});