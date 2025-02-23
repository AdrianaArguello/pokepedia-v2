
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./reduxProvider";
import Sidebar from "./components/combactPokeList";
import ClientWrapper from "./clientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ReduxProvider>
            <ClientWrapper>
                {children}
            </ClientWrapper>
          </ReduxProvider>
        </body>
      </html>
  );
}
