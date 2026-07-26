import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#1a1815",
          borderTop: "6px solid #e8a03c",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "monospace",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#e8a03c",
          }}
        >
          Software Engineer
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 72,
            fontStyle: "italic",
            color: "#f2efe9",
            maxWidth: 900,
          }}
        >
          Pratyush Patel
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 28,
            color: "#9c968a",
            maxWidth: 820,
          }}
        >
          Backend systems, applied ML, and cloud infrastructure.
        </div>
      </div>
    ),
    { ...size }
  );
}
