'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('accessToken');

    if (token) {
      localStorage.setItem('accessToken', token);
      console.log('Access Token:', token);
      router.replace('/users');
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">로그인 처리 중...</h1>
      <p className="text-gray-500 mt-2">잠시만 기다려 주세요</p>
    </div>
  );
}
