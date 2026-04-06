import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anthony Leuterio | Founder & Visionary',
  description: 'Philippines\' Premier Real Estate Visionary — Ecosystem Builder, PropTech Pioneer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@600;700;800&family=Roboto+Condensed:ital,wght@0,700;0,800;1,700;1,800&family=JetBrains+Mono:wght@400;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
