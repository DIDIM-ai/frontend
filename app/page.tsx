'use client';

import useAuthRedirect from '@/hooks/useAuthRedirect';
import { AuthModal } from '@/components/common/AuthModal';
import { AnalysisResult } from './components/AnalysisResult';
import { UploadMath } from './components/UploadMath';

export default function UploadPage() {
  const { isLoading, showLoginPrompt, handleLoginClick } = useAuthRedirect();

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

  return (
    <>
      <div className="flex flex-col gap-10">
        <UploadMath />
        <AnalysisResult />
      </div>
    </>
  );
}
