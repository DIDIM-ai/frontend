import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

const suite = localFont({
  src: [
    {
      path: '../public/fonts/SUITE-Regular.woff2',
      weight: '400',
    },
    {
      path: '../public/fonts/SUITE-Bold.woff2',
      weight: '700',
    },
  ],
  display: 'swap',
  variable: '--font-suite',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'AI 수학선생님',
  description: 'OCR 기반 수학문제 AI 풀이 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${suite.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
