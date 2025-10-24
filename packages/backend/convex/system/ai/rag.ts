import { google } from "@ai-sdk/google";
import { RAG } from "@convex-dev/rag";
import { components } from "../../_generated/api";

const googleModel = google.textEmbeddingModel("text-embedding-004");

const rag = new RAG(components.rag, {
    textEmbeddingModel: {
        ...googleModel,
        specificationVersion: "v1",
        doEmbed: googleModel.doEmbed,
    } as any,
    embeddingDimension: 768,
})

export default rag;