import "./globals.scss";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { NavBar } from "@/_components/NavBar";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home",
  description: "Recipe App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <main className='app'>
            <NavBar />
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
