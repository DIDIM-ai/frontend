import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';

interface GalleryUploadProps {
  onUpload: (file: File) => void;
}

export function GalleryUpload({ onUpload }: GalleryUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      onUpload(selectedFile);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <Button variant="outline" className="w-[130px]" onClick={handleClick}>
        <Image />
        <p>갤러리</p>
      </Button>
    </>
  );
}
