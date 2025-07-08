'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Images } from 'lucide-react';

interface Props {
  onUpload: (base64: string) => void;
}

export function GalleryUpload({ onUpload }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleGalleryClick = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onUpload(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Button variant="secondary" className="w-[130px]" onClick={handleGalleryClick}>
        <Images />
        <p>갤러리</p>
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
}
