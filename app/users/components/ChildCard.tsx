// components/ChildCard.tsx
'use client';

import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

type ChildCardProps = {
  name: string;
  grade: string;
  selected?: boolean;
  onClick?: () => void;
};

export function ChildCard({ name, grade, selected = false, onClick }: ChildCardProps) {
  return (
    <section
      onClick={onClick}
      className={`
        relative w-[130px] h-[130px]
        rounded-[5px] shadow-sm
        flex flex-col items-center justify-center border border-primary
        ${selected ? 'bg-primary text-white' : 'bg-white text-black'}
        cursor-pointer 
      `}
    >
      <div className="w-14 h-14 rounded-full border border-primary flex items-center justify-center mb-1">
        <Image
          src="/assets/profile.png"
          alt="자녀 프로필"
          width={50}
          height={50}
        />
      </div>

      <div className="font-semibold text-base">{name}</div>
      <div className={`text-sm ${selected ? '' : 'text-gray-500'}`}>{grade}</div>

      {/* 케밥 메뉴 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            onClick={(e) => e.stopPropagation()} 
            className="absolute top-1 right-1 p-1 rounded-md hover:bg-primary/20 focus:outline-none z-50"
          >
            <MoreVertical
              className={`w-4 h-4 ${selected ? 'text-white' : 'text-primary'}`}
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent
            align="end"
            side="top"
            sideOffset={8}
            className="absolute top-3 right-1 z-50 w-[80px] rounded-md 
            border border-primary bg-secondary shadow-md text-sm "
          >
            <DropdownMenuItem onSelect={() => alert('수정 클릭됨')}>수정</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => alert('삭제 클릭됨')}>삭제</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </section>
  );
}
