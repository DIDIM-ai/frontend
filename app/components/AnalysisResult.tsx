'use client';

import { useEffect, useState } from 'react';
import { ListCard } from '@/components/ui/listcard';
import { ListCardSkeleton } from '@/components/common/ListCardSkeleton';
import Link from 'next/link';
import { authorizedFetch } from '@/lib/authorizedFetch';

interface AnalysisResultItem {
  logSolveId: number;
  imageUrl: string;
  problemTitle: string;
  uploadedAt: string;
}

export function AnalysisResult() {
  const [results, setResults] = useState<AnalysisResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      let storedData;
      if (typeof window !== 'undefined') {
        const selectedChildId = localStorage.getItem('selected-child');
        storedData = selectedChildId ? JSON.parse(selectedChildId).state.selectedChild.id : null;
      }

      try {
        const res = await authorizedFetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/math/logs?page=0&size=3&userJrId=${storedData}`,
        );
        if (!res.ok) {
          throw new Error('데이터를 불러오지 못했습니다.');
        }
        const data = await res.json();
        setResults(data.logs);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  console.log(results);

  return (
    <section>
      <h3 className="text-xl font-bold mb-2.5">최근 분석 결과</h3>
      {loading && <ListCardSkeleton count={3} />}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="flex flex-col gap-2.5">
        {results.map((item) => (
          <Link href={`/result/${item.logSolveId}`} key={item.logSolveId}>
            <ListCard
              id={item.logSolveId}
              imageSrc={item.imageUrl}
              text={item.problemTitle}
              date={item.uploadedAt.split('T')[0]}
            />
          </Link>
        ))}
      </ul>
    </section>
  );
}
