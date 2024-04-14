import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import Providers from "/src/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatPDF",
  description: "Chat with PDF",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en" suppressHydrationWarning>
          <body className={inter.className}>{children}</body>
          <Toaster />
        </html>
      </Providers>
    </ClerkProvider>
  );
}
