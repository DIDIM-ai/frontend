import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface CameraCaptureProps {
  stream: MediaStream | null;
  onCapture: (file: Blob) => void;
  stopStream: () => void;
}

export function CameraCapture({ stream, onCapture, stopStream }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
    return () => {
      stopStream();
    };
  }, [stopStream, stream]);

  const takePhoto = () => {
    if (videoRef.current && photoRef.current) {
      setIsCapturing(true);
      const video = videoRef.current;
      const photo = photoRef.current;
      const ctx = photo.getContext('2d');

      if (ctx) {
        photo.width = video.videoWidth;
        photo.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, photo.width, photo.height);

        photo.toBlob(
          (blob) => {
            if (blob) {
              onCapture(blob);
              stopStream();
            }
            setIsCapturing(false);
          },
          'image/jpeg',
          0.9,
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <video
        ref={videoRef}
        autoPlay
        className="w-full h-[300px] bg-black rounded-lg object-contain"
      ></video>
      <canvas ref={photoRef} className="hidden"></canvas>
      <div className="flex gap-2">
        <Button onClick={takePhoto} disabled={isCapturing}>
          {isCapturing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              촬영 중...
            </>
          ) : (
            '사진 찍기'
          )}
        </Button>
        <Button variant="outline" onClick={stopStream}>
          취소
        </Button>
      </div>
    </div>
  );
}
