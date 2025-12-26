import { Metadata } from "next/types";
import "./globals.css";

export const metadata: Metadata = {
  title: "To do app",
  description: "practice project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
