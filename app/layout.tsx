import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CAVÉLOR | The Essence of Modern Luxury",
  description: "Curated timeless luxury fashion, haute couture, tailored silhouettes, and handcrafted accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FAF7F2] text-[#1D1B1B] selection:bg-[#4A0E17] selection:text-white">
        {children}
      </body>
    </html>
  );
}
