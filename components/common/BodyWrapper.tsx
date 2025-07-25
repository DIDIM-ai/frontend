'use client';

import { usePathname } from 'next/navigation';
import { RootHeader } from '@/components/common/RootHeader';
import { ResultHeader } from '@/components/common/ResultHeader';
import { MenuBar } from '@/components/common/MenuBar';
import { pagesConfig } from '@/config/pagesConfig';

interface Props {
  children: React.ReactNode;
}

export function BodyWrapper({ children }: Props) {
  const pathname = usePathname();

  const currentPageConfig = pagesConfig[pathname as keyof typeof pagesConfig] || {
    headerType: 'secondary',
    showFooter: false,
  };

  const isErrorOrForbiddenPage = pathname === '/not-found' || pathname === '/forbidden';

  const showRootHeader = currentPageConfig.headerType === 'primary' && !isErrorOrForbiddenPage;
  const showResultHeader = currentPageConfig.headerType === 'secondary' && !isErrorOrForbiddenPage;
  const showMenuBar = currentPageConfig.showFooter && !isErrorOrForbiddenPage;

  return (
    <>
      {showRootHeader && <RootHeader />}
      {showResultHeader && <ResultHeader />}

      <div className="pb-20">{children}</div>

      {showMenuBar && <MenuBar />}
    </>
  );
}
