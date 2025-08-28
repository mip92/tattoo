import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Tattoo Client
        </div>
        <div
          style={{
            fontSize: 32,
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Modern Tattoo Business Management Platform
        </div>
        <div
          style={{
            fontSize: 24,
            marginTop: 40,
            opacity: 0.8,
          }}
        >
          Product Catalog • Inventory Management • Role-Based Access
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
