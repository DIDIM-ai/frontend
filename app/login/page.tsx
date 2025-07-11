'use client';

import Image from 'next/image';
import { AnimatedCounter } from '@/app/login/components/AnimatedCounter';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-[50px]" />

      <p className="text-base mb-10">지금까지 분석 된 문제 수</p>

      <h1 className="text-6xl font-bold text-primary drop-shadow-[0_8px_4px_rgba(255,119,16,0.6)] mb-20">
        <AnimatedCounter targetNumber={12254} />
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
      className="w-[200px] h-[45px] flex items-center justify-center gap-2 bg-[#FEE500] rounded-md shadow text-black font-semibold cursor-pointer"
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
