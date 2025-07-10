'use client';

import Image from 'next/image';

interface EmptyChildCardProps {
  onRegisterClick?: () => void;
}

export function EmptyChildCard({ onRegisterClick }: EmptyChildCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <p className="text-center text-black">등록된 자녀가 없습니다</p>

      <button
        onClick={onRegisterClick}
        className="w-[284px] h-[60px] flex items-center justify-center gap-4 
                   border-2 border-dotted border-secondary bg-white
                   rounded-[5px] text-gray-400 cursor-pointer"
      >
        <Image
          src="/assets/plus.svg"
          alt="자녀 추가"
          width={30}
          height={30}
        />
        <span className="text-[20px]">자녀 등록하기</span>
      </button>
    </div>
  );
}
