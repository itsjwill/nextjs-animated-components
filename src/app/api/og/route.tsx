import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

// =============================================================================
// OG Image Generator API Route
// =============================================================================
// Generates dynamic Open Graph images for social sharing
// Usage: /api/og?title=My%20Title&description=My%20Description
//
// Query Parameters:
// - title: Main title (default: "Awwwards UI")
// - description: Subtitle text (optional)
// - theme: "dark" | "light" | "gradient" (default: "gradient")
// - badge: Small badge text (optional)
// =============================================================================

export const runtime = "edge";

// Image dimensions (Twitter/Open Graph recommended)
const WIDTH = 1200;
const HEIGHT = 630;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const title = searchParams.get("title") || "Awwwards UI";
    const description = searchParams.get("description") || "";
    const theme = searchParams.get("theme") || "gradient";
    const badge = searchParams.get("badge") || "";

    // Theme configurations
    const themes = {
      dark: {
        background: "linear-gradient(to bottom right, #09090b, #18181b)",
        titleColor: "#ffffff",
        descColor: "#a1a1aa",
        badgeBg: "rgba(139, 92, 246, 0.2)",
        badgeColor: "#a78bfa",
        borderColor: "rgba(255, 255, 255, 0.1)",
      },
      light: {
        background: "linear-gradient(to bottom right, #ffffff, #f4f4f5)",
        titleColor: "#09090b",
        descColor: "#71717a",
        badgeBg: "rgba(139, 92, 246, 0.1)",
        badgeColor: "#7c3aed",
        borderColor: "rgba(0, 0, 0, 0.1)",
      },
      gradient: {
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #1a1a2e 100%)",
        titleColor: "#ffffff",
        descColor: "#94a3b8",
        badgeBg: "rgba(139, 92, 246, 0.3)",
        badgeColor: "#c4b5fd",
        borderColor: "rgba(139, 92, 246, 0.3)",
      },
    };

    const currentTheme = themes[theme as keyof typeof themes] || themes.gradient;

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: currentTheme.background,
            padding: "60px",
            position: "relative",
          }}
        >
          {/* Decorative elements */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), " +
                "radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)",
            }}
          />

          {/* Grid pattern overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), " +
                "linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          {/* Content container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              maxWidth: "1000px",
              position: "relative",
            }}
          >
            {/* Badge */}
            {badge && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px 20px",
                  background: currentTheme.badgeBg,
                  borderRadius: "100px",
                  marginBottom: "24px",
                  border: `1px solid ${currentTheme.borderColor}`,
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    color: currentTheme.badgeColor,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {badge}
                </span>
              </div>
            )}

            {/* Title */}
            <h1
              style={{
                fontSize: title.length > 30 ? "56px" : "72px",
                fontWeight: 700,
                color: currentTheme.titleColor,
                lineHeight: 1.1,
                margin: 0,
                marginBottom: description ? "24px" : 0,
                background:
                  theme === "gradient"
                    ? "linear-gradient(135deg, #ffffff 0%, #c4b5fd 50%, #f9a8d4 100%)"
                    : "none",
                backgroundClip: theme === "gradient" ? "text" : "border-box",
                // @ts-ignore - WebkitBackgroundClip is valid for ImageResponse
                WebkitBackgroundClip: theme === "gradient" ? "text" : "border-box",
                // @ts-ignore
                WebkitTextFillColor: theme === "gradient" ? "transparent" : currentTheme.titleColor,
              }}
            >
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p
                style={{
                  fontSize: "28px",
                  fontWeight: 400,
                  color: currentTheme.descColor,
                  lineHeight: 1.4,
                  margin: 0,
                  maxWidth: "800px",
                }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Logo/Branding at bottom */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* Logo placeholder - geometric shape */}
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "white", fontSize: "20px", fontWeight: 700 }}>A</span>
            </div>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: currentTheme.descColor,
              }}
            >
              Awwwards UI
            </span>
          </div>
        </div>
      ),
      {
        width: WIDTH,
        height: HEIGHT,
      }
    );
  } catch (error) {
    console.error("OG Image generation error:", error);

    // Return a simple fallback image on error
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#09090b",
            color: "#ffffff",
            fontSize: "48px",
            fontWeight: 700,
          }}
        >
          Awwwards UI
        </div>
      ),
      { width: WIDTH, height: HEIGHT }
    );
  }
}
