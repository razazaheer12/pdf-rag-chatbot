export default () => ({
  port: Number.parseInt(process.env.PORT ?? '', 10) || 5000,
  xai: {
    apiKey: process.env.XAI_API_KEY ?? '',
  },
  pinecone: {
    apiKey: process.env.PINECONE_API_KEY ?? '',
    indexName: process.env.PINECONE_INDEX_NAME ?? '',
    dimension:
      Number.parseInt(process.env.PINECONE_DIMENSION ?? '', 10) || 1024,
  },
});
