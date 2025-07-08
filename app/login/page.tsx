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
        className="mb-16"
        priority
      />

      <button className="cursor-pointer">
        <Image
          src="/assets/kakao-login.png"
          alt="카카오 로그인 버튼"
          width={183}
          height={45}
          priority
        />
      </button>
    </div>
  );
}
