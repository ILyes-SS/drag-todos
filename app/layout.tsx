import { Metadata } from "next/types";
import "./globals.css";
import ToDosProvider from "@/components/ToDosProvider";
import { fetchTodos } from "./actions/todos";

export const metadata: Metadata = {
  title: "To do app",
  description: "practice project",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result: any = await fetchTodos();
  return (
    <html lang="en">
      <body>
        <ToDosProvider initialTodos={result.data || []}>
          {children}
        </ToDosProvider>
      </body>
    </html>
  );
}
