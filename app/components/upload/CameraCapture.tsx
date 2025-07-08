'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  onCapture: (base64: string) => void;
  stream: MediaStream | null;
  stopStream: () => void;
}

export function CameraCapture({ onCapture, stream, stopStream }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx?.drawImage(video, 0, 0);

      const base64 = canvas.toDataURL('image/png');
      onCapture(base64);
      stopStream();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <video ref={videoRef} autoPlay playsInline className="rounded-lg w-full max-w-[320px]" />
      <Button onClick={handleCapture}>📸 캡처</Button>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
