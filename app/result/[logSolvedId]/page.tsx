'use client';

import useAuthRedirect from '@/hooks/useAuthRedirect';
import { AuthModal } from '@/components/common/AuthModal';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Problem } from '../components/Problem';
import { Solve } from '../components/Solve';
import { TextInput } from '../components/TextInput';

export default function ResultPage() {
  const params = useParams();
  const logSolvedId = params?.logSolvedId;

  const [problem, setProblem] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isLoading: authLoading, showLoginPrompt, handleLoginClick } = useAuthRedirect();

  const overallLoading = authLoading || dataLoading;

  // 모든 훅 호출은 컴포넌트 최상단에서 이루어집니다.
  // 이 부분이 React Hooks 규칙을 따르는 중요한 부분입니다.

  useEffect(() => {
    // authLoading이 true이면, 아직 인증 과정이 진행 중이므로 데이터 페치를 시작하지 않습니다.
    // 이는 인증이 완료된 후에만 데이터 요청을 보내도록 하여 불필요한 요청을 방지합니다.
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
  }, [logSolvedId, authLoading]); // authLoading이 변경될 때 useEffect가 다시 실행될 수 있도록 의존성 추가

  // --- 렌더링 로직 ---

  // 1. 전체 로딩 상태를 가장 먼저 검사합니다.
  // authLoading이 true라면, 이곳에서 "데이터를 불러오는 중입니다..." 메시지를 보여줍니다.
  // 이 단계에서 인증이 실패하면 (즉, 토큰이 없으면) useAuthRedirect 훅이 showLoginPrompt를 true로 만들고 AuthModal을 띄울 준비를 합니다.
  if (overallLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <p>데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  // 2. 로딩이 끝난 후 에러 상태를 검사합니다.
  // 이곳에서 에러가 발생했다는 것은 인증은 통과했으나 데이터 페치 과정에서 문제가 발생했음을 의미합니다.
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] text-red-600">
        <p>오류: {error}</p>
      </div>
    );
  }

  // 3. 모든 검사를 통과했을 때 실제 콘텐츠를 렌더링합니다.
  return (
    <>
      {problem && (
        <>
          <Problem problem={problem} />
          <Solve problem={problem} />
        </>
      )}
      <TextInput />

      {/* AuthModal은 showLoginPrompt 상태에 따라 조건부로 렌더링됩니다. */}
      {/* 인증이 필요하면 (showLoginPrompt가 true), 이 모달이 사용자에게 보입니다. */}
      <AuthModal isOpen={showLoginPrompt} onLoginClick={handleLoginClick} />
    </>
  );
}
