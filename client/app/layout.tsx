import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/atoms/toaster";
import Footer from "@/components/organisms/Footer";
import NavigationBar from "@/components/organisms/Navigation";
import { ApolloWrapper } from "@/lib/apollo-client";
import { RoutesWrapper, ThemeProvider } from "@/providers";

const inter = Inter({ subsets: ["latin-ext"] });

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
    <html lang="en">
      <body className={`${inter.className} relative min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ApolloWrapper>
            <RoutesWrapper>
              <NavigationBar />
              <section className="pb-20">{children}</section>
              <Footer />
              <Toaster />
            </RoutesWrapper>
          </ApolloWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
