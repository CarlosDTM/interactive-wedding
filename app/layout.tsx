import { Gwendolyn, Montserrat } from 'next/font/google';
import './globals.css';

const gwendolyn = Gwendolyn({ 
  weight: ['400'], 
  subsets: ['latin'], 
  variable: '--font-gwendolyn' 
});

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-montserrat' 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${gwendolyn.variable} ${montserrat.variable}`}>
      <body className="font-montserrat bg-[#F3DDC3] text-[#5F5420] antialiased">
        {children}
      </body>
    </html>
  );
}