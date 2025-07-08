import { Button } from '@/components/ui/button';
import { Camera, Images } from 'lucide-react';

export function UploadMath() {
  return (
    <section>
      <h3 className="text-xl font-bold mb-2.5">문제 업로드</h3>
      <div className="flex flex-col w-full h-[200px] border-dotted border-2 border-primary rounded-[10px] flex items-center justify-center gap-5 mb-5">
        <div className="w-[70px] h-[70px] rounded-full bg-secondary flex items-center justify-center">
          <Camera width={50} height={50} className="text-primary stroke-1" />
        </div>
        <p className="text-center text-sm text-gray-300">
          아이가 어려워하는 문제를 촬영하거나 <br />
          갤러리에서 이미지를 선택해주세요
        </p>
      </div>
      <div className="flex justify-center gap-2.5">
        <Button variant="secondary" className="w-[130px] cursor-pointer">
          <Images />
          <p>갤러리</p>
        </Button>
        <Button variant="default" className="w-[130px] cursor-pointer">
          <Camera />
          <p>촬영하기</p>
        </Button>
      </div>
    </section>
  );
}
