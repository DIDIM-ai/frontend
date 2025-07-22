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

interface AuthDialogProps {
  isOpen: boolean;
  onLoginClick: () => void;
}

export function AuthDialog({ isOpen, onLoginClick }: AuthDialogProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[280px] flex flex-col items-center">
        <DialogHeader className="">
          <DialogTitle>로그인이 필요한 서비스입니다</DialogTitle>
          <DialogDescription>카카오 계정으로 간편하게 이용해요!</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" onClick={onLoginClick}>
            로그인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
