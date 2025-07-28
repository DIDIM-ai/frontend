import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ChildRegisterModal({ isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen}>
      <DialogOverlay className="bg-white"/>
      <DialogContent className="sm:max-w-[320px]" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">등록된 자녀가 없습니다</DialogTitle>
        </DialogHeader>
        <p className="text-center text-sm mb-6">
          DIDIM 서비스를 이용하려면<br />
          자녀를 먼저 등록해 주세요
        </p>
        <DialogFooter>
          <Button className="w-full" onClick={onClose}>
            자녀 등록하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
