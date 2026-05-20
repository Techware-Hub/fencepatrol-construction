import { Inter, Anton } from "next/font/google";
import "./globals.css";
import { BUSINESS } from "@/content/index.js";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import JsonLd from "@/components/JsonLd.jsx";
import PhoneBadge from "@/components/PhoneBadge.jsx";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });

export const metadata = {
  metadataBase: new URL("https://tntfenceco.com"),
  title: {
    default: "Gefence LLC — Fence Installation in Greeley, CO",
    template: "%s | Gefence LLC — Greeley Fence Company",
  },
  description:
    "Wood, vinyl, aluminum, deer & pool fencing plus automatic gates across Greeley & Northern Colorado. Free written estimates.",
  openGraph: { type: "website", siteName: BUSINESS.name, images: ["/img/og.jpg"] },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
      <body>
        <JsonLd />
        <Navbar />
        {children}
        <Footer />
        <PhoneBadge variant="floating" />
      </body>
    </html>
  );
}
