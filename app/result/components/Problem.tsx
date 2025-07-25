'use client';

import Image from 'next/image';

interface ProblemProps {
  problem: {
    image_url?: string;
    problem_text?: string;
  };
}

export function Problem({ problem }: ProblemProps) {
  return (
    <section className="mb-10">
      <h3 className="text-xl font-bold mb-5">문제</h3>
      <div className="relative w-full aspect-[280/200] mb-2.5">
        <Image
          loader={() => problem.image_url ?? '/assets/example.png'}
          src={`${problem.image_url}` || '/assets/example.png'}
          alt="문제 이미지"
          fill
          className="object-fit border border-zinc-200 rounded-lg p-3"
        />
      </div>
      <p className="px-2 mb-7">{problem?.problem_text || '문제 정보가 없습니다.'}</p>
      <div className="relative max-w-[var(--space-mobileMax)] left-0 right-0 bg-gray-50 h-2 -mx-5" />
    </section>
  );
}
