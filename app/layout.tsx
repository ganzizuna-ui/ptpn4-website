import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PTPN IV REGIONAL I MEDAN | Perkebunan Nusantara Indonesia",
  description:
    "PT Perkebunan Nusantara IV - Perusahaan perkebunan terkemuka di Indonesia, bergerak dalam industri kelapa sawit dan karet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased bg-white text-zinc-900`}>
        {children}
      </body>
    </html>
  );
}
