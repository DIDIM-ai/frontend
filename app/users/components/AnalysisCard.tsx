'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ListCard } from '@/components/ui/listcard';

type Analysis = {
  imageUrl: string;
  description: string;
  date: string;
};

type AnalysisCardProps = {
  analyses: Analysis[];
};

const ITEMS_PER_PAGE = 5;

export function AnalysisCard({ analyses }: AnalysisCardProps) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView();

  // 분석 대상이 바뀌면 초기화
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [analyses]);

  // 무한 스크롤 처리
  useEffect(() => {
    if (inView && !isLoading && visibleCount < analyses.length) {
      setIsLoading(true);
      setTimeout(() => {
        setVisibleCount((prev) =>
          Math.min(prev + ITEMS_PER_PAGE, analyses.length)
        );
        setIsLoading(false);
      }, 800);
    }
  }, [inView, isLoading, visibleCount, analyses.length]);

  if (analyses.length === 0) {
    return <p className="text-sm text-gray-500">분석 기록이 없습니다.</p>;
  }

  return (
    <div className="flex flex-col gap-2.5">
      {analyses.slice(0, visibleCount).map((item, idx) => (
        <ListCard
          key={idx}
          id={idx}
          imageSrc={item.imageUrl}
          text={item.description}
          date={item.date}
        />
      ))}

      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 border-4 border-gray-100 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {visibleCount < analyses.length && <div ref={ref} className="h-6" />}
    </div>
  );
}
