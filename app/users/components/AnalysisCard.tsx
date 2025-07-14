'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

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

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [analyses]);

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
    <div className="flex flex-col gap-3">
      {analyses.slice(0, visibleCount).map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-4 rounded-[5px] border p-2.5 w-full bg-white"
        >
          <Image
            src={item.imageUrl}
            alt="분석 이미지"
            width={80}
            height={80}
            className="rounded-md"
          />
          <div className="flex flex-col gap-[5px]">
            <div className="line-clamp-2 font-medium text-sm ">
              {item.description}
            </div>
            <div className="text-gray-500 text-xs">{item.date}</div>
          </div>
        </div>
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
