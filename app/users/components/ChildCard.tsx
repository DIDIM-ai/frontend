'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { toast } from 'sonner';

type ChildCardProps = {
  id: string;
  name: string;
  grade: string;
  profileImageUrl?: string | null;
  selected?: boolean;
  onClick: () => void;
  onDeleted?: (id: string) => void;
};

export function ChildCard({
  id,
  name,
  grade,
  profileImageUrl,
  selected = false,
  onClick,
  onDeleted,
}: ChildCardProps) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-jrs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!res.ok) throw new Error('자녀 삭제 실패');

      toast.success(`${name} 프로필이 삭제되었습니다.`);
      setShowModal(false);
      onDeleted?.(id);
    } catch (err) {
      console.error('자녀 삭제 오류:', err);
      toast.error('삭제 중 오류가 발생했습니다.');
      setShowModal(false);
    }
  };

  const handleEdit = () => {
    router.push(`/users/edit/${id}`);
  };

  return (
    <>
      <section
        onClick={onClick}
        className={`relative w-[130px] h-[130px] rounded-[5px] flex flex-col items-center justify-center border border-primary
        ${selected ? 'bg-primary text-white' : 'bg-white text-black'}
        cursor-pointer shadow-[0_2px_5px_0_theme('colors.secondary.DEFAULT')]`}
      >
        <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden border border-primary mb-1">
          <Image
            src={profileImageUrl || '/assets/profile.png'}
            alt="자녀 프로필"
            fill
            className="object-cover"
          />
        </div>

        <div className="font-semibold">{name}</div>
        <div className={`text-sm ${selected ? '' : 'text-gray-500'}`}>
          초등학교 {grade}학년
        </div>

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
                onSelect={handleOpenModal}
              >
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </section>

      <ConfirmModal
        open={showModal}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
        message={`${name} 프로필을 삭제하시겠습니까?`}
        cancelText="취소"
        confirmText="삭제"
      />
    </>
  );
}
