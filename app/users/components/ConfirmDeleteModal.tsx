import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  childName: string;
}

export function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  childName,
}: ConfirmDeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="rounded-xl w-[280px] p-0 text-center shadow-md" 
        showCloseButton={false}>

      <DialogTitle>
        <VisuallyHidden>자녀 프로필 삭제 확인</VisuallyHidden>
      </DialogTitle>
      
      <div className="p-4 text-base font-semibold">
        {childName} 프로필을 삭제하시겠습니까?
      </div>

        <div className="border-t flex">
          <button
            onClick={onClose}
            className="w-1/2 py-3 text-sm font-medium hover:bg-muted">
            취소
          </button>
          <div className="w-[1px] bg-gray-300" />
          <button
            onClick={onConfirm}
            className="w-1/2 py-3 text-sm font-medium text-primary hover:bg-muted" >
            삭제
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
