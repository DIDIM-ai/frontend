'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Loader2 } from 'lucide-react';
import { GalleryUpload } from '@/app/components/upload/GalleryUpload';
import { CameraCapture } from '@/app/components/upload/CameraCapture';
import { toast } from 'sonner';

export function UploadMath() {
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const startCamera = async () => {
    setShowCamera(true);

    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1024 },
          height: { ideal: 1080 },
        },
      });
      setStream(media);
    } catch (err) {
      console.error('카메라 접근 실패:', err);
      toast.error('카메라 접근에 실패했습니다.');
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach((track) => track.stop());
    setStream(null);
    setShowCamera(false);
  };

  const handleFileUpload = async (file: File | Blob) => {
    console.log('업로드할 파일/Blob 객체:', file);
    setIsUploading(true);

    const formData = new FormData();
    formData.append('mathProblemImage', file, (file as File).name || 'captured_image.jpeg');

    formData.append('userId', 'user_id_example');
    formData.append('problemType', 'math');

    try {
      const response = await fetch('/api/math/solve', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: '알 수 없는 오류' }));
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorData.message || '업로드 실패'}`,
        );
      }

      const result = await response.json();
      console.log('업로드 성공:', result);
      toast.success('문제가 성공적으로 업로드되었습니다!');
    } catch (error) {
      console.error('업로드 실패:', error);
      toast.error(
        `업로드 중 오류가 발생했습니다: ${
          error instanceof Error ? error.message : '알 수 없는 오류'
        }`,
      );
    } finally {
      setIsUploading(false);
      stopCamera();
    }
  };

  console.log(showCamera);

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
            <GalleryUpload onUpload={handleFileUpload} />
            <Button
              variant="default"
              className="w-[calc(50%-15px)]"
              onClick={startCamera}
              disabled={isUploading}
            >
              <Camera />
              <p>촬영하기</p>
            </Button>
          </div>
        </>
      ) : (
        <CameraCapture onCapture={handleFileUpload} stream={stream} stopStream={stopCamera} />
      )}
      {isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
            <p>문제 업로드 중...</p>
          </div>
        </div>
      )}
    </section>
  );
}
