import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%)",
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
            fontSize: 72,
            fontWeight: "bold",
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          🎨 Tattoo Client
        </div>
        <div
          style={{
            fontSize: 36,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.3,
            marginBottom: 40,
          }}
        >
          Transform Your Tattoo Business
        </div>
        <div
          style={{
            fontSize: 28,
            opacity: 0.9,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Professional Management Platform for Modern Studios
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
