import { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config";

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000/graphql",
  documents: ["./src/graphql/**/*.graphql"],
  generates: {
    "./src/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
        scalars: {
          DateTime: "string",
          Date: "string",
          Time: "string",
          Upload: "File",
        },
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
