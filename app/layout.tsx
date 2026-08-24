import type { Metadata } from "next";
import { Wix_Madefor_Text } from "next/font/google";
import "./globals.css";

const wix = Wix_Madefor_Text({
    subsets: ['latin'],
    variable:'--wix-font'
});


export const metadata: Metadata = {
  title: "Superflights | Flight booking made effortless",
  description: "Search, compare, and book smooth flight deals across India with Superflights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${wix.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
