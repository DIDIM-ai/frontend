'use client';

import { usePathname } from 'next/navigation';
import { RootHeader } from '@/components/common/RootHeader';
import { RemoveBodyPointerEvents } from '@/components/common/RemoveBodyPointerEvents';

interface Props {
  children: React.ReactNode;
}

export function BodyWrapper({ children }: Props) {
  const pathname = usePathname();
  const excludePaths = ['/login'];
  const isExcluded = excludePaths.includes(pathname);

  return (
    <div className="max-w-[var(--space-mobileMax)] min-h-screen px-5 py-4 mx-auto border-x border-zinc-200">
      <RemoveBodyPointerEvents />
      {!isExcluded && <RootHeader />}
      {children}
    </div>
  );
}
