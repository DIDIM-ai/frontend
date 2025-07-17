'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ChildCard } from './components/ChildCard';
import { AddChildCard } from './components/AddChildCard';
import { EmptyChildCard } from './components/EmptyChild';
import { AnalysisCard } from './components/AnalysisCard';
import { WithdrawButton } from './components/WithdrawButton';

import { useUserStore } from '@/lib/store/useUserStore';
import { authorizedFetch } from '@/lib/authorizedFetch'; 

export default function UsersPage() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.warn('Access token 없음 → 로그인 페이지로 이동');
      router.replace('/login');
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const res = await authorizedFetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test/api/temp/user/me`);
        if (!res.ok) throw new Error(`응답 실패: ${res.status}`);
        const data = await res.json();
        console.log('사용자 정보 확인:', data);
        setUser(data);
        setIsLoading(false);
      } catch (error) {
        console.error('인증 실패:', error);
        localStorage.removeItem('accessToken');
        clearUser();
        router.replace('/login');
      }
    };

    fetchUserInfo();
  }, [router, setUser, clearUser]);

  if (isLoading) {
    return <div className="text-center mt-20">사용자 인증 중...</div>;
  }

  const children = [
    {
      name: '자녀 1',
      grade: '초등학교 4학년',
      analyses: Array.from({ length: 20 }, (_, i) => ({
        imageUrl: '/assets/example.png',
        description: `문제 ${i + 1}입니다. 자녀의 문제 풀이 분석입니다.`,
        date: '2025.07.10',
      })),
    },
    {
      name: '자녀 2',
      grade: '초등학교 3학년',
      analyses: [],
    },
    {
      name: '자녀 3',
      grade: '초등학교 6학년',
      analyses: [],
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">자녀 관리</h2>
      {children.length === 0 ? (
        <EmptyChildCard onRegisterClick={() => router.push('/users/register-child')} />
      ) : (
        <div className="flex justify-center mb-4">
          <div className="grid grid-cols-2 gap-6">
            {children.map((child, index) => (
              <ChildCard
                key={index}
                id={`${index}`}
                name={child.name}
                grade={child.grade}
                selected={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
            <AddChildCard />
          </div>
        </div>
      )}

      <h2 className="text-lg font-semibold my-4">이전 분석 기록</h2>

      {selectedIndex !== null && <AnalysisCard />}

      <div className="flex flex-col items-start gap-4 mt-10 text-sm text-gray-300">
        <button
          onClick={() => {
            localStorage.removeItem('accessToken');
            clearUser();
            router.push('/login');
          }}
        >
          로그아웃
        </button>
        <WithdrawButton />
      </div>
    </div>
  );
}
