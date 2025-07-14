'use client';

import { usePathname } from 'next/navigation';
import { RootHeader } from '@/components/common/RootHeader';
import { RemoveBodyPointerEvents } from '@/components/common/RemoveBodyPointerEvents';
import { ResultHeader } from './ResultHeader';
import { MenuBar } from './MenuBar';

interface Props {
  children: React.ReactNode;
}

export function BodyWrapper({ children }: Props) {
  const pathname = usePathname();
  const excludePaths = ['/login', '/result'];
  const isExcluded = excludePaths.includes(pathname);
  const isResultPage = pathname.startsWith('/result');

  return (
    <div className="relative max-w-[var(--space-mobileMax)] min-h-screen px-5 py-4 mx-auto border-x border-zinc-200">
      <RemoveBodyPointerEvents />
      {!isExcluded && <RootHeader />}
      {isResultPage && <ResultHeader />}
      <div className="pb-20">
        {children}
        {(!isExcluded || isResultPage) && <MenuBar />}
      </div>
    </div>
  );
}
