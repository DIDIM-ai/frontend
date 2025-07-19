'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ListCard } from '@/components/ui/listcard';
import { ListCardSkeleton } from '@/components/common/ListCardSkeleton';
import { authorizedFetch } from '@/lib/authorizedFetch';
import { useSelectedChildStore } from '@/lib/store/useSelectedChildStore';

interface AnalysisResultItem {
  logSolveId: number;
  imageUrl: string;
  problemTitle: string;
  uploadedAt: string;
}

const ITEMS_PER_PAGE = 5;

export function AnalysisCard() {
  const selectedChild = useSelectedChildStore((state) => state.selectedChild);

  const [allLogs, setAllLogs] = useState<AnalysisResultItem[]>([]);
  const [visibleLogs, setVisibleLogs] = useState<AnalysisResultItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { ref, inView } = useInView();

  const fetchLogs = async () => {
    try {
      if (!selectedChild) {
        setError('자녀를 먼저 선택해주세요.');
        setIsInitialLoading(false);
        return;
      }

      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('로그인이 필요합니다.');
        setIsInitialLoading(false);
        return;
      }

      const res = await authorizedFetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/math/logs?userJrId=${selectedChild.id}`,
      );
      if (!res.ok) throw new Error(`요청 실패: ${res.status}`);

      const data = await res.json();
      const logs: AnalysisResultItem[] = data.logs;

      setAllLogs(logs);
      setVisibleLogs(logs.slice(0, ITEMS_PER_PAGE));
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터를 불러오지 못했습니다.');
    } finally {
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [selectedChild]); 

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
