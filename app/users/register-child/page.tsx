'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import { authorizedFetch } from '@/lib/authorizedFetch';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { AuthModal } from '@/components/common/AuthModal';
import { ChildForm } from '../components/ChildForm';
import { ChildRegisterModal } from '../components/ChildRegisterModal';

export default function RegisterChildPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [hasChild, setHasChild] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(true);

  const {
    isLoading,        
    showLoginPrompt,  
    handleLoginClick, 
  } = useAuthRedirect();

  useEffect(() => {
    if (user) {
      (async () => {
        const res = await authorizedFetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-jrs/parent`
        );
        const data = await res.json();
        setHasChild(data?.length > 0);
      })();
    }
  }, [user]);

  if (isLoading || hasChild === null) {
    return (
      <>
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <p>인증 정보를 확인 중입니다...</p>
        </div>
        <AuthModal isOpen={showLoginPrompt} onLoginClick={handleLoginClick} />
      </>
    );
  }

  if (!user) return null;

  return (
    <>
      <ChildRegisterModal isOpen={!hasChild && showModal} onClose={() => setShowModal(false)} />
      <div className="px-4 py-6">
        <h2 className="text-xl font-semibold mb-6">자녀 등록</h2>
        <ChildForm
          mode="register"
          parentId={user.userId}
          onSubmit={() => router.push('/users')}
          onCancel={() => router.push('/users')}
        />
      </div>
    </>
  );
}
