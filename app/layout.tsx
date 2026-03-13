import { Gwendolyn, Cinzel } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import 'remixicon/fonts/remixicon.css';

export const metadata: Metadata = {
  title: 'Carlos & Alexia',
  icons: {
    icon: '/ring_icon.png',
    apple: '/ring_icon.png',
  },
  openGraph: {
    title: 'Carlos & Alexia',
    images: [],
  },
  twitter: {
    card: 'summary',
    images: [],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const gwendolyn = Gwendolyn({ 
  weight: ['400', '700'],
  subsets: ['latin'], 
  variable: '--font-gwendolyn' 
});

const cinzel = Cinzel({ 
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'], 
  variable: '--font-cinzel' 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${gwendolyn.variable} ${cinzel.variable}`}>
      <body className="bg-[#F3DDC3] text-[#5F5420] antialiased">
        {children}
      </body>
    </html>
  );
}