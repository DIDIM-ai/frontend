'use client';

import useAuthRedirect from '@/hooks/useAuthRedirect';
import { AnalysisResult } from './components/AnalysisResult';
import { UploadMath } from './components/UploadMath';
import { AuthDialog } from './users/components/AuthDialog';

export default function UploadPage() {
  const { isLoading, showLoginPrompt, handleLoginClick } = useAuthRedirect();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <p>인증 정보를 확인 중입니다...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <UploadMath />
        <AnalysisResult />
      </div>

      <AuthDialog isOpen={showLoginPrompt} onLoginClick={handleLoginClick} />
    </>
  );
}
