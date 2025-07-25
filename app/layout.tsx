import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { BodyWrapper } from '@/components/common/BodyWrapper';

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
  title: 'DIDIM',
  description: '학부모를 위한 AI 기반 수학 문제 분석 서비스',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${suite.variable} ${montserrat.variable}`}>
      <body>
        <div className="relative max-w-[var(--space-mobileMax)] min-h-screen px-5 py-4 mx-auto border-x border-gray-100">
          <BodyWrapper>{children}</BodyWrapper>
        </div>
        <Toaster
          richColors
          closeButton={false}
          duration={3000}
          position="bottom-center"
          toastOptions={{ style: { marginBottom: '80px' } }}
        />
      </body>
    </html>
  );
}
