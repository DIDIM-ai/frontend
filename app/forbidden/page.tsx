import Link from 'next/link';

export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-151px)] text-center">
      <div className="mb-4">
        <h3 className="text-6xl font-bold text-gray-800">403</h3>
        <p className="text-2xl text-gray-600 mt-4">접근이 금지되었습니다.</p>
      </div>
      <Link href="/" className="text-primary">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
