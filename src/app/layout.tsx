import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#087A58",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "CLAIM READY — A Free Warranty Claim Checklist",
  description:
    "A free checklist for anyone about to file a warranty claim. A warranty claim is decided on records. Keep yours, and ask for theirs in writing.",
  keywords: [
    "warranty claim",
    "warranty checklist",
    "consumer rights",
    "job sheet",
    "repair claim",
    "inspection report",
    "consumer helpline",
  ],
  authors: [{ name: "Claim Ready" }],
  openGraph: {
    title: "CLAIM READY — A Free Warranty Claim Checklist",
    description:
      "A warranty claim is decided on records. Keep yours, and ask for theirs in writing. 15 steps for phone, TV, laptop, and appliance claims.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-neutral text-on-surface antialiased font-sans selection:bg-primary-soft-2 selection:text-primary-ink">
        {children}
      </body>
    </html>
  );
}
