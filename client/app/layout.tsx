import { ThemeProvider } from "@/providers/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import NavigationBar from "@/components/organisms/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "eCommerce App || Created with NextJS and GraphQL 😜",
  description: "eCommerce App for better performance with better tech stack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavigationBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
