'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { authorizedFetch } from '@/lib/authorizedFetch';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { AuthModal } from '@/components/common/AuthModal';
import  Loading  from '@/components/common/Loading';
import { ChildForm } from '@/app/users/components/ChildForm';

type UserInputType = {
  id: number;
  parentId: number;
  name: string;
  grade: number;
  profileImageUrl?: string;
};

export default function EditChildPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [userInput, setUserInput] = useState<UserInputType | null>(null);

  const {
    isLoading,
    showLoginPrompt,
    handleLoginClick,
  } = useAuthRedirect();

  const handleBackToUsers = useCallback(() => {
    router.push('/users');
  }, [router]);

  useEffect(() => {
    const fetchChild = async () => {
      if (!id) return;

      try {
        const res = await authorizedFetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-jrs/${id}`
        );

        if (!res.ok) {
          throw new Error('Fetch failed');
        }

        const data = await res.json();

        setUserInput({
          id: data.id,
          parentId: data.parentId,
          name: data.name,
          grade: data.schoolGrade,
          profileImageUrl: data.profileImageUrl ?? '/assets/profile.png',
        });
      } catch (err) {
        console.error('자녀 정보 불러오기 실패:', err);
        toast.error('자녀 정보를 불러오지 못했습니다.');
      }
    };

    fetchChild();
  }, [id, handleBackToUsers]);

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <p>인증 정보를 확인 중입니다...</p>
        </div>
        <AuthModal isOpen={showLoginPrompt} onLoginClick={handleLoginClick} />
      </>
    );
  }

  if (!userInput) {
    return <Loading />;
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold mb-6">자녀 정보 수정</h2>
      <ChildForm
        mode="edit"
        parentId={userInput.parentId}
        userInput={userInput}
        onSubmit={handleBackToUsers}
        onCancel={handleBackToUsers}
      />
    </div>
  );
}
