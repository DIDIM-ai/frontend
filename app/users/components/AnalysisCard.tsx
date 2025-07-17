'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ListCard } from '@/components/ui/listcard';
import { ListCardSkeleton } from '@/components/common/ListCardSkeleton';

interface AnalysisResultItem {
  logSolveId: number;
  imageUrl: string;
  problemTitle: string;
  uploadedAt: string;
}


const ITEMS_PER_PAGE = 5;

export function AnalysisCard() {
  const [allLogs, setAllLogs] = useState<AnalysisResultItem[]>([]);
  const [visibleLogs, setVisibleLogs] = useState<AnalysisResultItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true); 
  const { ref, inView } = useInView();

  const fetchLogs = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/math/all-logs`);
      const data = await res.json();
      setAllLogs(data.logs);
      setVisibleLogs(data.logs?.slice(0, ITEMS_PER_PAGE));
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터를 불러오지 못했습니다.');
    } finally {
      setIsInitialLoading(false); 
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    if (inView && !loading && visibleLogs.length < allLogs.length) {
      setLoading(true);
      setTimeout(() => {
        const nextItems = allLogs.slice(
          visibleLogs.length,
          visibleLogs.length + ITEMS_PER_PAGE
        );
        setVisibleLogs(prev => [...prev, ...nextItems]);
        setLoading(false);
      }, 600);
    }
  }, [inView, loading, visibleLogs, allLogs]);

  if (error) return <p className="text-sm text-red-500">{error}</p>;

  if (isInitialLoading) {
    return <ListCardSkeleton count={ITEMS_PER_PAGE} />;
  }

  if (!allLogs.length) {
    return <p className="text-sm text-gray-500">분석 기록이 없습니다.</p>;
  }

  return (
    <div className="flex flex-col gap-2.5">
      {visibleLogs.map(item => (
        <ListCard
          key={item.logSolveId}
          id={item.logSolveId}
          imageSrc={item.imageUrl}
          text={item.problemTitle}
          date={item.uploadedAt.split('T')[0]}
        />
      ))}

      {loading && (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 border-4 border-gray-100 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {visibleLogs.length < allLogs.length && <div ref={ref} className="h-6" />}
    </div>
  );
}
