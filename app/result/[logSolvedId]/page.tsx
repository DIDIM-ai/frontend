'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Problem } from '../components/Problem';
import { Solve } from '../components/Solve';
import { TextInput } from '../components/TextInput';

export default function ResultPage() {
  const params = useParams();
  const logSolvedId = params?.logSolvedId;

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!logSolvedId) return;
    const fetchProblem = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/math/${logSolvedId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (!res.ok) throw new Error('문제 데이터를 불러오지 못했습니다.');
        const data = await res.json();
        setProblem(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('알 수 없는 오류');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [logSolvedId]);

  if (loading) return <div>문제 불러오는 중...</div>;
  if (error) return <div>오류: {error}</div>;

  console.log(problem);

  return (
    <>
      {problem && (
        <>
          <Problem problem={problem} />
          <Solve problem={problem} />
        </>
      )}
      <TextInput />
    </>
  );
}
