import { config } from "dotenv";
import path from "path";
import { getClientPinecone } from "../lib/pinecone";
import { InferenceClient } from "@huggingface/inference";
import products from "../data/products.json";

const seedPinecone = async () => {
  try {
    //initialize client
    const indexName = process.env.PINECONE_INDEX_NAME!;
    const pinecone = await getClientPinecone();
    const index = pinecone.Index(indexName);
    const hf = new InferenceClient(process.env.HF_TOKEN);

    //prepare batch embeddings

    const batchSize = 10;

    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);

      //generate embeddings
      const embeddings = await hf.featureExtraction({
        model: process.env.EMBEDDING_MODEL!,
        inputs: batch.map(
          (product) => `${product.name}: ${product.description}`
        ),
      });

      //prepare upsert req
      const upsertRequest = batch.map((product, idx) => ({
        id: product.id,
        values: Array.isArray(embeddings[idx])
          ? (embeddings[idx].flat(Infinity) as number[])
          : (embeddings[idx] as number),
        metadata: {
          ...product,
          colors: product.colors.join("|"),
          features: product.features.join("|"),
        },
      }));

      await index.upsert(upsertRequest);
      console.log(`Processed Batch  ${i / batchSize + 1}`);
    }

    console.log("Seeding completed.");
  } catch (e) {
    console.log("Error seeding Pinecone", e);
    process.exit();
  }
};
