import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/global/globals.css";
import { ReduxProvider } from "@/providers/ReduxProvider";
import {
  AntDesignConfigProvider,
  NetworkProvider,
  ReactQueryConfigProvider,
  VersionSupportProvider,
} from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Made by Ayham hammami",
  description: "Generated by Ayham Hammami",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Made by Ayham hammami</title>
      </head>
      <body className={inter.className}>
        <VersionSupportProvider>
          <ReduxProvider>
            <ReactQueryConfigProvider>
              <AntDesignConfigProvider>
                <NetworkProvider>{children}</NetworkProvider>
              </AntDesignConfigProvider>
            </ReactQueryConfigProvider>
          </ReduxProvider>
        </VersionSupportProvider>
      </body>
    </html>
  );
}
