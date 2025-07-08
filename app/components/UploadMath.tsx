'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { GalleryUpload } from '@/app/components/upload/GalleryUpload';
import { CameraCapture } from '@/app/components/upload/CameraCapture';

export function UploadMath() {
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    setShowCamera(true);
    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(media);
    } catch (err) {
      console.error('카메라 접근 실패:', err);
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach((track) => track.stop());
    setStream(null);
    setShowCamera(false);
  };

  const handleBase64Upload = (base64: string) => {
    console.log('base64:', base64);
    // 서버에 업로드 요청
  };

  return (
    <section>
      <h3 className="text-xl font-bold mb-2.5">문제 업로드</h3>

      {!showCamera ? (
        <>
          <div className="flex flex-col w-full h-[200px] border-dotted border-2 border-primary rounded-[10px] items-center justify-center gap-5 mb-5">
            <div className="w-[70px] h-[70px] rounded-full bg-secondary flex items-center justify-center">
              <Camera width={50} height={50} className="text-primary stroke-1" />
            </div>
            <p className="text-center text-sm text-gray-300">
              아이가 어려워하는 문제를 촬영하거나 <br />
              갤러리에서 이미지를 선택해주세요
            </p>
          </div>

          <div className="flex justify-center gap-2.5">
            <GalleryUpload onUpload={handleBase64Upload} />
            <Button variant="default" className="w-[130px]" onClick={startCamera}>
              <Camera />
              <p>촬영하기</p>
            </Button>
          </div>
        </>
      ) : (
        <CameraCapture onCapture={handleBase64Upload} stream={stream} stopStream={stopCamera} />
      )}
    </section>
  );
}
