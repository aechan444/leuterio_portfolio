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
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;800;900&family=Cinzel:wght@400;700;900&family=JetBrains+Mono:wght@400;800&family=Jost:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
