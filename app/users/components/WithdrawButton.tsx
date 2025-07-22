'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { useUserStore } from '@/stores/useUserStore';
import { toast } from 'sonner';

export function WithdrawButton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleWithdraw = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!res.ok) throw new Error('회원 탈퇴 실패');

      localStorage.removeItem('accessToken');
      clearUser();
      toast.success('회원 탈퇴가 완료되었습니다.');
      router.push('/login');
    } catch (err) {
      console.error('탈퇴 오류:', err);
      toast.error('탈퇴 중 오류가 발생했습니다.');
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <button onClick={handleOpen}>회원탈퇴</button>
      <ConfirmModal
        open={open}
        onClose={handleClose}
        onConfirm={handleWithdraw}
        message="회원 탈퇴하시겠습니까?"
        cancelText="취소"
        confirmText="확인"
      />
    </>
  );
}
