'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function AddChildCard() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push('/users/register-child')}
      className="w-[140px] h-[140px] rounded-[5px] border-2 border-dashed border-primary shadow-[0_2px_5px_0_theme('colors.secondary.DEFAULT')] 
      flex flex-col items-center justify-center cursor-pointer"
    >
      <Image
        src="/assets/plus.svg"
        alt="자녀 아바타"
        width={50}
        height={50}
      />
      <div className="font-semibold mt-3 text-gray-500">자녀 추가하기</div> 
    </button>
  );
}
