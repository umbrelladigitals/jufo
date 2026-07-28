import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JUFO | Çok Yakında - Yenilikçi Gıda Ürünleri',
  description: 'Jufo çok yakında sizlerle! Yüksek kaliteli gıda ürünleri ve yenilikçi lezzetler çok yakında sofralarınızda ve raflarda.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo_jufo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800;900&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#0b0c10] text-slate-100 font-sans antialiased selection:bg-purple-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
