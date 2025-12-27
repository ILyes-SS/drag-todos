import { Metadata } from "next/types";
import "./globals.css";
import ToDosProvider from "@/components/ToDosProvider";

export const metadata: Metadata = {
  title: "To do app",
  description: "practice project",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToDosProvider initialTodos={[]}>{children}</ToDosProvider>
      </body>
    </html>
  );
}
