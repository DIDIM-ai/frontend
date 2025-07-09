'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export function ResultHeader() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <header className="relative mb-[35px] flex justify-center items-center h-10">
      <button onClick={handleBack} className="absolute left-0 !cursor-pointer">
        <ChevronLeft />
      </button>

      <h2 className="text-2xl font-bold">분석 결과</h2>
    </header>
  );
}
