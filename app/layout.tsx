import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '900'] });

export const metadata: Metadata = {
  title: 'Odonto K — Clínica Odontológica | São Lourenço & Vitória',
  description:
    'Sua referência em saúde bucal e atendimento acolhedor em Pernambuco. Agende sua consulta em São Lourenço da Mata ou Vitória de Santo Antão.',
  openGraph: {
    title: 'Odonto K — Clínica Odontológica',
    description:
      'Sua referência em saúde bucal e atendimento acolhedor. Agende sua avaliação.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}