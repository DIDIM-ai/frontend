import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { BodyWrapper } from '../components/common/BodyWrapper';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

const suite = localFont({
  src: '../public/fonts/SUITE-Regular.woff2',
  variable: '--font-suite',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI teacher',
  description: '학부모를 위한 AI 기반 수학 문제 분석 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${suite.variable} ${montserrat.variable}`}>
      <BodyWrapper>{children}</BodyWrapper>
    </html>
  );
}
