'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatedCounter } from '@/app/login/components/AnimatedCounter';
import Lottie from 'lottie-react';
import loadingAnimation from '@/public/assets/lottie/login.json'; 

export default function LoginPage() {
  const [problemCount, setProblemCount] = useState<number | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const fetchProblemCount = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/math/logs-total`);
        const data = await res.json();
        setProblemCount(data.total); 
      } catch (error) {
        console.error('문제 수 불러오기 실패:', error);
        setProblemCount(0);
      }
    };

    fetchProblemCount();
  }, []);

  const handleLogin = () => {
    setIsLoggingIn(true);
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/kakao?redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`;
  };

if (isLoggingIn) {
  return (
    <div className="fixed inset-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-[70%] flex flex-col items-center">
        <Lottie animationData={loadingAnimation} loop className="w-70 h-70" />
        <p className="text-xl text-gray-500">로그인 처리 중 . . .</p>
      </div>
    </div>
  );
}


  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <p className="mb-10 text-lg">지금까지 분석된 문제 수</p>

      <h1 className="text-6xl font-black text-primary drop-shadow-[0_8px_4px_rgba(255,119,16,0.6)] mb-20">
        {problemCount !== null ? (
          <AnimatedCounter targetNumber={problemCount} />
        ) : (
          <div>0</div> 
        )}
      </h1>

      <Image
        src="/assets/login-illustration.svg"
        alt="로그인 페이지 일러스트"
        width={280}
        height={197}
        className="mb-18"
        priority
      />

      <button
        className="w-[300px] h-[50px] flex items-center justify-center gap-2 bg-[#FEE500] rounded-md shadow text-black font-semibold cursor-pointer"
        onClick={handleLogin}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M12 2C6.48 2 2 6.02 2 10.86c0 2.38 1.55 4.49 3.94 5.74-.11.79-.61 3.46-.71 4.15 0 0-.02.18.09.25.11.07.27-.01.27-.01 1.1-.15 4.48-2.91 5.15-3.47.4.05.81.08 1.26.08 5.52 0 10-4.02 10-8.86S17.52 2 12 2z" />
        </svg>
        <span>카카오 로그인</span>
      </button>
    </div>
  );
}
