import type { Metadata } from "next";
import { CartProvider } from "@/components/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Acme Store",
  description: "Minimal e-commerce storefront for fashion and electronics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
