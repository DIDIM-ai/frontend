'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

type ChildCardProps = {
  id: string;
  name: string;
  grade: string;
  selected?: boolean;
  onClick: () => void;
};

export function ChildCard({
  id,
  name,
  grade,
  selected = false,
  onClick
}: ChildCardProps) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    // 실제 삭제 로직 연결 필요
    alert(`${name} 삭제됨`);
    setShowModal(false);
  };

  const handleEdit = () => {
    router.push(`/users/edit/${id}`);
  };

  return (
    <>
      <section
        onClick={onClick}
        className={`
          relative w-[130px] h-[130px]
          rounded-[5px]
          flex flex-col items-center justify-center border border-primary
          ${selected ? 'bg-primary text-white' : 'bg-white text-black'}
          cursor-pointer
          shadow-[0_2px_5px_0_theme('colors.secondary.DEFAULT')]
        `}
      >
        <div className="rounded-full border border-primary flex items-center justify-center mb-1">
          <Image
            src="/assets/profile.png"
            alt="자녀 프로필"
            width={50}
            height={50}
          />
        </div>

        <div className="font-semibold">{name}</div>
        <div className={`text-sm ${selected ? '' : 'text-gray-500'}`}>{grade}</div>

        {/* 케밥 메뉴 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              onClick={(e) => e.stopPropagation()}
              className="absolute top-1 right-0 rounded-md z-50"
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
              className="absolute top-6 right-1 z-50 w-[80px] rounded-md 
              border border-primary bg-secondary shadow-md text-sm text-center p-0 font-semibold"
            >
              <DropdownMenuItem
                className="justify-center font-semibold"
                onSelect={handleEdit}
              >
                수정
              </DropdownMenuItem>
              <DropdownMenuSeparator className="h-[1px] bg-primary" />
              <DropdownMenuItem
                className="justify-center font-semibold"
                onSelect={() => setShowModal(true)}
              >
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </section>

      {/* 삭제 확인 모달 */}
      <ConfirmDeleteModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        childName={name}
      />
    </>
  );
}
