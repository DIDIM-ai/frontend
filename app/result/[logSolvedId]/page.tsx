'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Problem } from '../components/Problem';
import { Solve } from '../components/Solve';
import { TextInput } from '../components/TextInput';

export default function ResultPage() {
  interface ProblemData {
    problem: object;
  }

  const params = useParams();
  const logSolvedId = params?.logSolvedId;

  const [problem, setProblem] = useState<ProblemData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!logSolvedId) return;
    const fetchProblem = async () => {
      setLoading(true);
      setError(null);

      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${API_BASE_URL}/api/math/${logSolvedId}`);
        if (!res.ok) throw new Error('문제 데이터를 불러오지 못했습니다.');
        const data: ProblemData = await res.json();
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
      <Problem problem={problem} />
      <Solve problem={problem} />
      <TextInput />
    </>
  );
}
