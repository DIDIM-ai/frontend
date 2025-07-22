'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Lottie from 'lottie-react';
import Lock from '@/public/assets/lottie/lock.json';

interface AuthModalProps {
  isOpen: boolean;
  onLoginClick: () => void;
}

export function AuthModal({ isOpen, onLoginClick }: AuthModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="auth-dialog sm:max-w-[280px] flex flex-col items-center">
        <Lottie animationData={Lock} />
        <DialogHeader className="mb-4 items-center">
          <DialogTitle>로그인이 필요한 서비스입니다.</DialogTitle>
          <DialogDescription>카카오 계정으로 간편하게 이용해요!</DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full">
          <Button type="button" onClick={onLoginClick} className="w-full">
            3초만에 가입하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
