import { Instrument_Serif, JetBrains_Mono, Inter } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Preloader } from "@/components/preloader";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-serif",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// TODO: set to the real production domain once deployed on Vercel.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Pratyush Patel — Software Engineer",
  description: "Software engineer — backend systems and applied ML.",
  openGraph: {
    title: "Pratyush Patel — Software Engineer",
    description: "Software engineer — backend systems and applied ML.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratyush Patel — Software Engineer",
    description: "Software engineer — backend systems and applied ML.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable} ${sans.variable}`}>
      <body>
        <MotionConfig reducedMotion="user">
          <Preloader />
          <Nav />
          {children}
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
