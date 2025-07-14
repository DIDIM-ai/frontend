'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  cancelText: string;
  confirmText: string;
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = '확인',
  message,
  cancelText = '취소',
  confirmText = '확인',
}: ConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-xl w-[280px] p-0 text-center shadow-md" showCloseButton={false}>
        <DialogTitle>
          <VisuallyHidden>{title}</VisuallyHidden>
        </DialogTitle>

        <div className="p-4 text-base font-semibold">
          {message}
        </div>

        <div className="border-t flex">
          <button
            onClick={onClose}
            className="w-1/2 py-3 text-sm font-medium hover:bg-muted"
          >
            {cancelText}
          </button>
          <div className="w-[1px] bg-gray-300" />
          <button
            onClick={onConfirm}
            className="w-1/2 py-3 text-sm font-medium text-primary hover:bg-muted"
          >
            {confirmText}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
