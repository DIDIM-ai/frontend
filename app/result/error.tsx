'use client';

import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-151px)] text-center">
      <div className="mb-4">
        <h3 className="text-6xl font-bold text-gray-800">Error</h3>
        <p className="text-2xl text-gray-600 mt-4">예상치 못한 오류가 발생했습니다.</p>
      </div>
      <Link href="/" className="text-primary">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
