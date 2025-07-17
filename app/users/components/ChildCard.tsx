'use client';

import { useEffect, useState } from 'react';
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

type ChildCardProps = {
  id: string;
  name: string;
  grade: string;
  profileImageId?: number | null;
  parentId: number;
  selected?: boolean;
  onClick: () => void;
};

export function ChildCard({
  id,
  name,
  grade,
  profileImageId,
  parentId,
  selected = false,
  onClick,
}: ChildCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('/assets/profile.png'); // 기본 이미지
  const router = useRouter();

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (!profileImageId) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images/${profileImageId}?userId=${parentId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );

        if (!res.ok) throw new Error('이미지 URL 조회 실패');
        const data = await res.json();
        if (data.url) {
          setImageUrl(data.url);
        }
      } catch (err) {
        console.error('프로필 이미지 불러오기 실패:', err);
      }
    };

    fetchImageUrl();
  }, [profileImageId, parentId]);

  const handleDelete = () => {
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
        className={`relative w-[130px] h-[130px] rounded-[5px] flex flex-col items-center justify-center border border-primary
        ${selected ? 'bg-primary text-white' : 'bg-white text-black'}
        cursor-pointer shadow-[0_2px_5px_0_theme('colors.secondary.DEFAULT')]`}
      >
        <div className="rounded-full border border-primary flex items-center justify-center mb-1 overflow-hidden">
          <Image
            src={imageUrl}
            alt="자녀 프로필"
            width={50}
            height={50}
            className="rounded-full object-cover"
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
                onSelect={() => setShowModal(true)}
              >
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </section>

      <ConfirmModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        message={`${name} 프로필을 삭제하시겠습니까?`}
        cancelText="취소"
        confirmText="삭제"
      />
    </>
  );
}
