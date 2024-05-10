import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import NextTopLoader from "nextjs-toploader";
import { Header } from "./Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pair Find || Coder",
  description: "A platform where you find you mate who can code with you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {" "}
        <Providers>
          <Header />
          <NextTopLoader showSpinner={false} />
          <div className="xl:container">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
