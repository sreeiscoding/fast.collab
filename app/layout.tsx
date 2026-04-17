import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FastCollab",
  description: "Fast team media sharing. Auto-deletes in 7 days.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-canvas text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
