'use client';

import useAuthRedirect from '@/hooks/useAuthRedirect';
import { AuthModal } from '@/components/common/AuthModal';
import { useEffect, useState } from 'react';
import { redirect, useParams } from 'next/navigation';
import { Problem } from '../components/Problem';
import { Solve } from '../components/Solve';
import { TextInput } from '../components/TextInput';
import Loading from '@/components/common/Loading';
import { useLoadingStore } from '@/stores/useLoadingStore';

export default function ResultPage() {
  const params = useParams();
  const logSolvedId = params?.logSolvedId;

  const { isDataLoading: dataLoading, setDataLoading } = useLoadingStore();

  const [problem, setProblem] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const { isLoading: authLoading, showLoginPrompt, handleLoginClick } = useAuthRedirect();

  const overallLoading = authLoading || dataLoading;

  useEffect(() => {
    if (authLoading) return;

    if (!logSolvedId) {
      setDataLoading(false);
      setError('문제를 찾을 수 없습니다: ID가 누락되었습니다.');
      return;
    }

    const fetchProblem = async () => {
      setDataLoading(true);
      setError(null);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/math/${logSolvedId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (res.status === 401) {
          console.log('401');
          redirect('/forbidden');
        }

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || '문제 데이터를 불러오지 못했습니다.');
        }
        const data = await res.json();
        setProblem(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      } finally {
        setDataLoading(false);
      }
    };

    fetchProblem();
  }, [logSolvedId, authLoading, setDataLoading]);

  if (overallLoading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-[calc(100vh-91px)]">
          <Loading />
        </div>

        <AuthModal isOpen={showLoginPrompt} onLoginClick={handleLoginClick} />
      </>
    );
  }

  if (error) {
    redirect('/forbidden');
  }

  return (
    <>
      {problem && (
        <>
          <Problem problem={problem} />
          <Solve problem={problem} />
          <TextInput />
        </>
      )}
    </>
  );
}
