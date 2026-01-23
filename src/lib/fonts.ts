import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
  IBM_Plex_Mono,
  Outfit,
  DM_Sans,
  Syne,
  Manrope,
} from "next/font/google";

// =============================================================================
// Luxury: Space Grotesk + Inter
// Clean, geometric, high-end. Apple/Linear aesthetic.
// =============================================================================

export const luxuryHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-luxury-heading",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const luxuryBody = Inter({
  subsets: ["latin"],
  variable: "--font-luxury-body",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

// =============================================================================
// Cyberpunk: JetBrains Mono + IBM Plex Mono
// Monospace everything. Terminal aesthetic. Hacker vibes.
// =============================================================================

export const cyberHeading = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-cyber-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const cyberBody = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-cyber-body",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

// =============================================================================
// Kinetic: Outfit + DM Sans
// Rounded, friendly, energetic. Motion-first.
// =============================================================================

export const kineticHeading = Outfit({
  subsets: ["latin"],
  variable: "--font-kinetic-heading",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const kineticBody = DM_Sans({
  subsets: ["latin"],
  variable: "--font-kinetic-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// =============================================================================
// Freestyle: Syne + Manrope
// Bold, expressive, unexpected. Art-directed.
// =============================================================================

export const freestyleHeading = Syne({
  subsets: ["latin"],
  variable: "--font-free-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const freestyleBody = Manrope({
  subsets: ["latin"],
  variable: "--font-free-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// =============================================================================
// Combined class string for all font variables
// =============================================================================

export const fontVariables = [
  luxuryHeading.variable,
  luxuryBody.variable,
  cyberHeading.variable,
  cyberBody.variable,
  kineticHeading.variable,
  kineticBody.variable,
  freestyleHeading.variable,
  freestyleBody.variable,
].join(" ");
