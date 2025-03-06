import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HeyZack Kickstarter Wiki",
  description: "Dashboard and wiki for the HeyZack Kickstarter campaign",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-heyzack-black text-white`}>
        {children}
      </body>
    </html>
  );
}
