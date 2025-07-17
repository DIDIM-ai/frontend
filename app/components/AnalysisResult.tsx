'use client';

import { useEffect, useState } from 'react';
import { ListCard } from '@/components/ui/listcard';
import { ListCardSkeleton } from '@/components/common/ListCardSkeleton';

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
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${API_BASE_URL}/api/math/all-logs?page=0&size=3`);
        if (!response.ok) {
          throw new Error('데이터를 불러오지 못했습니다.');
        }
        const data = await response.json();
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
          <ListCard
            key={item.logSolveId}
            id={item.logSolveId}
            imageSrc={item.imageUrl}
            text={item.problemTitle}
            date={item.uploadedAt.split('T')[0]}
          />
        ))}
      </ul>
    </section>
  );
}
