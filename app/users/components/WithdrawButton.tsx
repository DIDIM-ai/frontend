'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConfirmModal } from '@/components/common/ConfirmModal';

export function WithdrawButton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleWithdraw = async () => {
    try {
      alert('회원 탈퇴 완료');
      setOpen(false);
      router.push('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>회원탈퇴</button>
      <ConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleWithdraw}
        message="회원 탈퇴하시겠습니까?"
        cancelText="취소"
        confirmText="확인"
      />
    </>
  );
}
