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
      <DialogContent className="rounded-xl w-[300px] p-0 text-center shadow-md" showCloseButton={false}>
        <DialogTitle>
          <VisuallyHidden>{title}</VisuallyHidden>
        </DialogTitle>

        <div className="p-4 text-lg font-semibold text-center items-center">
          {message}
        </div>

        <div className="border-t flex">
          <button
            onClick={onClose}
            className="w-1/2 py-3.5"
          >
            {cancelText}
          </button>
          <div className="w-[0.5px] bg-gray-300" />
          <button
            onClick={onConfirm}
            className="w-1/2 font-medium text-primary"
          >
            {confirmText}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
