import { Instrument_Serif, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

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

export const metadata = {
  title: "Pratyush Patel",
  description: "Software engineer — backend systems and applied ML.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable} ${sans.variable}`}>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
