import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RaKaN Store | المتجر الرقمي",
  description: "أفضل المنتجات الرقمية بأفضل الأسعار",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" data-theme="dark">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
