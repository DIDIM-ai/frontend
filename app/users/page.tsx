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

interface Child {
  id: number;
  name: string;
  schoolGrade: number;
  parentId: number;
  profileImageId: number | null;
}

export default function UsersPage() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [children, setChildren] = useState<Child[]>([]);

  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.warn('Access token 없음 → 로그인 페이지로 이동');
      router.replace('/login');
      return;
    }

    const fetchUserInfo = async () => {
      try {
        // 1. 사용자 정보 요청
        const res = await authorizedFetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/test/api/temp/user/me`
        );
        if (!res.ok) throw new Error(`사용자 정보 응답 실패: ${res.status}`);
        const userData = await res.json();
        setUser(userData);

        // 2. 자녀 목록 요청
        const childrenRes = await authorizedFetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-jrs/parent/${userData.userId}`
        );
        if (!childrenRes.ok) throw new Error('자녀 정보 조회 실패');

        const childList: Child[] = await childrenRes.json();
        setChildren(childList);
        setIsLoading(false);
      } catch (error) {
        console.error('인증 또는 자녀 조회 실패:', error);
        localStorage.removeItem('accessToken');
        clearUser();
        router.replace('/login');
      }
    };

    fetchUserInfo();
  }, [router, setUser, clearUser]);

  if (isLoading) return <div className="text-center mt-20">로딩 중...</div>;

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
                key={`child-${child.id}`} 
                id={`${child.id}`}
                name={child.name}
                grade={String(child.schoolGrade)}
                profileImageId={child.profileImageId}
                parentId={child.parentId}
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
