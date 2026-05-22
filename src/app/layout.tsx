import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Real Paris Tours",
  description:
    "Book unforgettable walking tours of Paris with local guides at Real Paris Tours. Explore hidden streets, history, and food in small groups.",
  keywords: ["Paris tours", "walking tours", "Paris guide", "Le Marais", "Montmartre"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-zinc-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
