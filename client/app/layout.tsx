import { ThemeProvider } from "@/providers/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import NavigationBar from "@/components/organisms/Navigation";
import Footer from "@/components/organisms/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Quickmart || A better eCommerce App in terms of performance and UI/UX || Created with NextJS, GraphQL and amazing Tailwind CSS😜",
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
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
