'use client';

import { usePathname } from 'next/navigation';
import { RootHeader } from '@/components/common/RootHeader';

interface Props {
  children: React.ReactNode;
}

export function BodyWrapper({ children }: Props) {
  const pathname = usePathname();

  const excludePaths = ['/login'];
  const isExcluded = excludePaths.includes(pathname);

  return (
    <body className="max-w-[var(--space-mobileMax)] min-h-screen px-5 py-4 mx-auto border-x-1 border-zinc-200">
      {!isExcluded && <RootHeader />}
      {children}
    </body>
  );
}
