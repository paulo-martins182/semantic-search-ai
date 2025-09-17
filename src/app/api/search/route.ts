import { getClientPinecone } from "@/app/lib/pinecone";
import { InferenceClient } from "@huggingface/inference";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const hf = new InferenceClient(process.env.HF_TOKEN);
    const { query } = await request.json();

    const response = await hf.featureExtraction({
      model: process.env.EMBEDDING_MODEL!,
      inputs: query,
    });

    //convert response
    const normalizeEmbedding = (embedding: unknown): number[] => {
      if (typeof embedding === "number") {
        return [embedding];
      }

      if (Array.isArray(embedding)) {
        return embedding
          .flatMap((item) => (Array.isArray(item) ? item : [item]))
          .map(Number);
      }

      throw new Error("Invalid embedding format");
    };

    //get formatted embedding

    const embedding = normalizeEmbedding(response);

    //query to pinecone
    const indexName = process.env.PINECONE_INDEX_NAME!;
    const pinecone = await getClientPinecone();
    const results = await pinecone.Index(indexName).query({
      vector: embedding,
      topK: 10,
      includeMetadata: true,
      filter: { inStock: true },
    });

    const filteredResults =
      results.matches?.filter((item) => item.score && item.score > 0.3) || [];

    //Format results

    const produtcs = filteredResults.map((item) => ({
      ...item.metadata,
      colors:
        typeof item.metadata?.colors === "string"
          ? item.metadata.colors.split("|")
          : [],
      features:
        typeof item.metadata?.features === "string"
          ? item.metadata.features.split("|")
          : [],
    }));

    return NextResponse.json(produtcs);
  } catch (e) {
    console.log("Error search", e);
    return NextResponse.json(
      { message: "Error search", error: e },
      { status: 500 }
    );
  }
};
