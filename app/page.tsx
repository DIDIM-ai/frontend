'use client';

import useAuthRedirect from '@/hooks/useAuthRedirect';
import { AnalysisResult } from './components/AnalysisResult';
import { UploadMath } from './components/UploadMath';

export default function UploadPage() {
  useAuthRedirect();

  return (
    <div className="flex flex-col gap-10">
      <UploadMath />
      <AnalysisResult />
    </div>
  );
}
