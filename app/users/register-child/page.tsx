'use client';

import { useRouter } from 'next/navigation';
import { ChildForm } from '../components/ChildForm';
import { useUserStore } from '@/stores/useUserStore';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { AuthModal } from '@/components/common/AuthModal';

export default function RegisterChildPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const {
    isLoading,        
    showLoginPrompt,  
    handleLoginClick, 
  } = useAuthRedirect();

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

  if (!user) return null;

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-6">자녀 등록</h2>
      <ChildForm
        mode="register"
        parentId={user.userId}
        onSubmit={() => router.push('/users')}
        onCancel={() => router.push('/users')}
      />
    </div>
  );
}
