import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import StoreProvider from "./StoreProvider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Login Chat WS",
  description: "Chat app with websockets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${roboto.variable} antialiased`}>
        <StoreProvider> {children}</StoreProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
