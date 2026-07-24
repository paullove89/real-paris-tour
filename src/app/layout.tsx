import type { Metadata } from "next";
import { Alegreya_Sans, IBM_Plex_Mono, Oswald } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const bodyFont = Alegreya_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
});

const displayFont = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "700"],
});

const labelFont = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-label",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Real Paris Tours",
  description:
    "Book unforgettable bike and walking tours of Paris with local guides at Real Paris Tours. Explore iconic landmarks and the creative north-east of the city.",
  keywords: ["Paris tours", "bike tours", "walking tours", "Paris guide", "North East Paris"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${labelFont.variable} min-h-screen bg-white text-zinc-900 antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
