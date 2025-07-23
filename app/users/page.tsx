'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useUserStore } from '@/stores/useUserStore';
import { useSelectedChildStore } from '@/stores/useSelectedChildStore';
import { authorizedFetch } from '@/lib/authorizedFetch';

import { AuthModal } from '@/components/common/AuthModal';
import useAuthRedirect from '@/hooks/useAuthRedirect';

import { ChildCard } from './components/ChildCard';
import { AddChildCard } from './components/AddChildCard';
import { EmptyChildCard } from './components/EmptyChild';
import { AnalysisCard } from './components/AnalysisCard';
import { WithdrawButton } from './components/WithdrawButton';
import { ChildCardSkeleton } from './components/ui/ChildCardSkeleton';

interface Child {
  id: number;
  name: string;
  schoolGrade: number;
  parentId: number;
  profileImageUrl?: string | null;
}

export default function UsersPage() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [children, setChildren] = useState<Child[]>([]);

  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const { setSelectedChild } = useSelectedChildStore();

  const {
    isLoading: authLoading,
    showLoginPrompt,
    handleLoginClick,
  } = useAuthRedirect();

  useEffect(() => {
    if (authLoading) return;

    const fetchUserInfo = async () => {
      try {
        const res = await authorizedFetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/test/api/temp/user/me`
        );
        if (!res.ok) throw new Error(`사용자 정보 응답 실패: ${res.status}`);

        const userData = await res.json();
        setUser(userData);

        const childrenRes = await authorizedFetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-jrs/parent`
        );
        if (!childrenRes.ok) throw new Error('자녀 정보 조회 실패');

        const childList: Child[] = await childrenRes.json();
        setChildren(childList);

        if (childList.length > 0) {
          const storedChild = useSelectedChildStore.getState().selectedChild;
          const matchedChild = childList.find((c) => c.id === storedChild?.id);
          const initialChild = matchedChild ?? childList[0];
          setSelectedChild(initialChild);
          setSelectedIndex(childList.findIndex((c) => c.id === initialChild.id));
        }

        setIsLoading(false);
      } catch (error) {
        console.error('인증 또는 자녀 조회 실패:', error);
        localStorage.removeItem('accessToken');
        clearUser();
        router.replace('/login');
      }
    };

    fetchUserInfo();
  }, [authLoading, router, setUser, clearUser, setSelectedChild]);

  const handleChildDeleted = (deletedId: number) => {
    const updatedChildren = children.filter((c) => c.id !== deletedId);
    setChildren(updatedChildren);

    if (children[selectedIndex]?.id === deletedId) {
      const newIndex = 0;
      setSelectedIndex(newIndex);
      if (updatedChildren.length > 0) {
        setSelectedChild(updatedChildren[newIndex]);
      }
    } else if (selectedIndex >= updatedChildren.length) {
      const newIndex = updatedChildren.length - 1;
      setSelectedIndex(newIndex);
      setSelectedChild(updatedChildren[newIndex]);
    }
  };

  if (authLoading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <p>인증 정보를 확인 중입니다...</p>
        </div>
        <AuthModal isOpen={showLoginPrompt} onLoginClick={handleLoginClick} />
      </>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">자녀 관리</h2>

      {isLoading ? (
        <div className="flex justify-center mb-4">
          <div className="grid grid-cols-2 gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <ChildCardSkeleton key={idx} />
            ))}
          </div>
        </div>
      ) : children.length === 0 ? (
        <EmptyChildCard onRegisterClick={() => router.push('/users/register-child')} />
      ) : (
        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-2 gap-6">
            {children.map((child, index) => (
              <ChildCard
                key={`child-${child.id}`}
                id={`${child.id}`}
                name={child.name}
                grade={String(child.schoolGrade)}
                profileImageUrl={child.profileImageUrl}
                selected={selectedIndex === index}
                onClick={() => {
                  setSelectedIndex(index);
                  setSelectedChild(child);
                }}
                onDeleted={() => handleChildDeleted(child.id)}
              />
            ))}
            <AddChildCard />
          </div>
        </div>
      )}

      <h2 className="text-lg font-semibold mb-6">이전 분석 기록</h2>
      <AnalysisCard />

      <div className="flex flex-col items-start gap-4 mt-10 text-sm text-gray-300 cursor-pointer">
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
