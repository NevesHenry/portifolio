import { ImageResponse } from "next/og";

export const alt = "Henrique Reis Neves — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          backgroundColor: "#0f1620",
          color: "#e7ecf0",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#8fa0b3" }}>
          software developer · são josé dos campos, br
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            marginTop: 20,
          }}
        >
          Henrique Reis Neves
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#8fa0b3",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          Event-driven backends · full-stack apps · cloud-native systems
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 30,
            color: "#45d9b0",
            marginTop: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: "#45d9b0",
            }}
          />
          status: open to new roles
        </div>
      </div>
    ),
    { ...size }
  );
}
