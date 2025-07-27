'use client';

import { usePathname } from 'next/navigation';
import { RootHeader } from '@/components/common/RootHeader';
import { ResultHeader } from '@/components/common/ResultHeader';
import { MenuBar } from '@/components/common/MenuBar';
import { pagesConfig } from '@/config/pagesConfig';
import { useLoadingStore } from '@/stores/useLoadingStore';

interface Props {
  children: React.ReactNode;
}

export function BodyWrapper({ children }: Props) {
  const pathname = usePathname();
  const { isDataLoading } = useLoadingStore();

    const normalizePath = (path: string): string => {
    if (path.startsWith('/users/edit/')) return '/users/edit/[id]';
    return path;
  };

  const matchedPath = normalizePath(pathname);

  const currentPageConfig = pagesConfig[matchedPath as keyof typeof pagesConfig] || {
    headerType: 'secondary',
    showFooter: false,
  };

  const isErrorOrForbiddenPage = pathname === '/not-found' || pathname === '/forbidden';

  const showRootHeader = currentPageConfig.headerType === 'primary' && !isErrorOrForbiddenPage;
  const showResultHeader = currentPageConfig.headerType === 'secondary' && !isErrorOrForbiddenPage;
  const showMenuBar = currentPageConfig.showFooter && !isErrorOrForbiddenPage;

  return (
    <>
      {!isDataLoading && showRootHeader && <RootHeader />}
      {!isDataLoading && showResultHeader && <ResultHeader />}

      <div className="pb-20">{children}</div>

      {showMenuBar && <MenuBar />}
    </>
  );
}
