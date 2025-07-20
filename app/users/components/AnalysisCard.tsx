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
  const [logs, setLogs] = useState<AnalysisResultItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView();

  const fetchLogs = async (page: number) => {
    try {
      if (!selectedChild) {
        setError('자녀를 먼저 선택해주세요.');
        return;
      }

      setLoading(true);
      const res = await authorizedFetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/math/logs?userJrId=${selectedChild.id}&page=${page}&size=${ITEMS_PER_PAGE}`
      );
      if (!res.ok) throw new Error(`요청 실패: ${res.status}`);


      const data = await res.json();
      const newLogs: AnalysisResultItem[] = data.logs;

      setLogs((prev) => [...prev, ...newLogs]);
      setHasMore(newLogs.length === ITEMS_PER_PAGE);
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLogs([]);
    setPage(0);
    setHasMore(true);
    setError(null);
    if (selectedChild) {
      fetchLogs(0);
    }
  }, [selectedChild]);

  useEffect(() => {
    if (inView && !loading && hasMore) {
      fetchLogs(page + 1);
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!logs.length && loading) return <ListCardSkeleton count={ITEMS_PER_PAGE} />;
  if (!logs.length) return <p className="text-sm text-gray-500">분석 기록이 없습니다.</p>;

  return (
    <div className="flex flex-col gap-2.5">
      {logs.map((item) => (
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

      {hasMore && <div ref={ref} className="h-6" />}
    </div>
  );
}
