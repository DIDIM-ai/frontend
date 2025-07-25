'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { ListCard } from '@/components/ui/listcard';
import { ListCardSkeleton } from '@/components/common/ListCardSkeleton';
import { authorizedFetch } from '@/lib/authorizedFetch';
import { useSelectedChildStore } from '@/stores/useSelectedChildStore';
import { NoDataFound } from '@/components/common/NoDataFound';

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

  const fetchedPagesRef = useRef<Set<string>>(new Set());
  const { ref, inView } = useInView({ threshold: 0.5 });

  const getPageKey = (childId: number, page: number) => `${childId}_${page}`;

  const fetchLogs = useCallback(
    async (pageToFetch: number) => {
      if (!selectedChild) return;

      const pageKey = getPageKey(selectedChild.id, pageToFetch);
      if (fetchedPagesRef.current.has(pageKey)) return;

      fetchedPagesRef.current.add(pageKey);
      setLoading(true);

      try {
        const res = await authorizedFetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/math/logs?userJrId=${selectedChild.id}&page=${pageToFetch}&size=${ITEMS_PER_PAGE}`,
        );
        if (!res.ok) throw new Error(`요청 실패: ${res.status}`);

        const data = await res.json();
        const newLogs: AnalysisResultItem[] = data.logs;

        setLogs((prev) => {
          const existingIds = new Set(prev.map((log) => log.logSolveId));
          return [...prev, ...newLogs.filter((log) => !existingIds.has(log.logSolveId))];
        });

        setHasMore(newLogs.length === ITEMS_PER_PAGE);
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    },
    [selectedChild],
  );

  useEffect(() => {
    if (!selectedChild) return;

    setLogs([]);
    setPage(0);
    setHasMore(true);
    setError(null);
    fetchedPagesRef.current.clear();

    fetchLogs(0);
  }, [selectedChild, fetchLogs]);

  useEffect(() => {
    if (page !== 0) {
      fetchLogs(page);
    }
  }, [page, fetchLogs]);

  useEffect(() => {
    if (inView && !loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [inView, loading, hasMore]);

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!logs.length && loading) return <ListCardSkeleton count={Math.min(3, ITEMS_PER_PAGE)} />;
  if (!logs.length) return <NoDataFound />;

  return (
    <div className="flex flex-col gap-2.5">
      {logs.map((item) => (
        <Link key={item.logSolveId} href={`/result/${item.logSolveId}`} className="block">
          <ListCard
            id={item.logSolveId}
            imageSrc={item.imageUrl}
            text={item.problemTitle}
            date={item.uploadedAt.split('T')[0]}
          />
        </Link>
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
