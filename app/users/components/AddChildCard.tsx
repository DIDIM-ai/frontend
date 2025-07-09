// components/AddChildCard.tsx
'use client';
import Image from 'next/image';

export function AddChildCard() {
  return (
    <div className="w-[130px] h-[130px] rounded-[5px] border-2 border-dashed border-primary flex flex-col items-center justify-center cursor-pointer">
      <Image
        src="/assets/plus.svg"
        alt="자녀 아바타"
        width={50}
        height={50} />
      <div className="text-sm mt-3 text-gray-500">자녀 추가하기</div>
    </div>
  );
}
