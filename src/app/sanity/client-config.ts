import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '1ahjdaoy',
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: true,
});

export default client;
