'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { authorizedFetch } from '@/lib/authorizedFetch';
import { resizeImage } from '@/lib/image';

interface ChildFormProps {
  mode?: 'register' | 'edit';
  parentId: number;
  userInput?: {
    id?: number;
    name: string;
    grade: number;
    profileImageUrl?: string;
  };
  onSubmit: () => void;
  onCancel?: () => void;
}

const gradeOptions = [
  { label: '초등 1학년', value: 1 },
  { label: '초등 2학년', value: 2 },
  { label: '초등 3학년', value: 3 },
  { label: '초등 4학년', value: 4 },
  { label: '초등 5학년', value: 5 },
  { label: '초등 6학년', value: 6 },
];

export function ChildForm({
  mode = 'register',
  userInput,
  onSubmit,
  onCancel,
}: ChildFormProps) {
  const [name, setName] = useState(userInput?.name || '');
  const [grade, setGrade] = useState<number>(userInput?.grade || 1);
  const [profileUrl, setProfileUrl] = useState(userInput?.profileImageUrl ?? '/assets/profile.png');
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [nameError, setNameError] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const resizedFile = await resizeImage(file, 300);
  setSelectedFile(resizedFile);

  const tempUrl = URL.createObjectURL(resizedFile);
  setProfileUrl(tempUrl);
};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setNameError('닉네임을 입력해주세요.');
      return;
    } else {
      setNameError('');
    }

    setUploading(true);

    try {
      if (mode === 'register') {
        const formData = new FormData();

        const metadata = {
          nickname: name,
          schoolGrade: grade,
        };

        const metadataBlob = new Blob([JSON.stringify(metadata)], {
          type: 'application/json',
        });

        formData.append('metadata', metadataBlob);
        if (selectedFile) {
          formData.append('image', selectedFile);
        }

        const res = await authorizedFetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-jrs`, {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) throw new Error('자녀 등록 실패');

        toast.success(`${name} 프로필이 등록되었습니다.`);
      } else if (mode === 'edit' && userInput?.id) {
          const formData = new FormData();

          const metadata = {
            nickname: name,
            schoolGrade: grade,
          };

          const metadataBlob = new Blob([JSON.stringify(metadata)], {
          type: 'application/json',
        });

        formData.append('metadata', metadataBlob);

        if (selectedFile) {
          formData.append('image', selectedFile);
        }

      const res = await authorizedFetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-jrs/${userInput.id}`,
        {
          method: 'PATCH',
          body: formData,
        }
      );

      if (!res.ok) throw new Error('자녀 수정 실패');
      toast.success(`${name} 프로필이 수정되었습니다.`);
      } else {
        throw new Error('잘못된 요청');
      }
      onSubmit();
    } catch (err) {
      console.error(err);
      toast.error('처리 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-8 w-full max-w-xs mx-auto"
    >
      <div className="relative self-start">
        <div
          className="cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          >
          <Image
            loader={() => profileUrl ?? '/assets/profile.png'}
            src={profileUrl}
            alt="프로필"
            width={70}
            height={70}
            className="rounded-full border border-primary object-cover w-[70px] h-[70px]"
          />
        </div>
        <button
            type="button"
            className="absolute -bottom-0 -right-0 bg-primary w-5 h-5 rounded-full flex items-center justify-center text-white text-xs pointer-events-none"
          >
            +
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* 이름 입력 */}
      <div className="w-full">
        <label className="block font-medium mb-2">이름 (닉네임)</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
          className="focus-visible:ring-2 focus-visible:ring-[rgba(255,119,16,0.3)]"
        />
        {nameError && <p className="text-sm text-red-500 mt-1">{nameError}</p>}
      </div>

      {/* 학년 선택 */}
      <div className="w-full mb-8">
        <label className="block font-medium mb-1">학년</label>
        <Select value={grade.toString()} onValueChange={(v) => setGrade(Number(v))}>
          <SelectTrigger className="w-full h-12 cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {gradeOptions.map((g) => (
              <SelectItem key={g.value} value={g.value.toString()} className='cursor-pointer'>
                {g.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 버튼 */}
      <div className="w-full flex flex-col gap-1">
        <Button
          type="submit"
          className="bg-primary text-white mb-2"
          size="lg"
          disabled={uploading}
        >
          {uploading ? '처리 중...' : mode === 'edit' ? '수정 완료' : '확인'}
        </Button>
        {onCancel && (
          <Button variant="secondary" type="button" onClick={onCancel} size="lg">
            취소
          </Button>
        )}
      </div>
    </form>
  );
}
