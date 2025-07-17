'use client';

import { useState } from 'react';
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

interface ChildFormProps {
  mode?: 'register' | 'edit';
  parentId: number;
  defaultValues?: {
    name: string;
    grade: number;
    profileUrl?: string;
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
  parentId,
  defaultValues,
  onSubmit,
  onCancel,
}: ChildFormProps) {
  const [name, setName] = useState(defaultValues?.name || '');
  const [grade, setGrade] = useState<number>(defaultValues?.grade || 1);
  const [profileUrl] = useState(defaultValues?.profileUrl || '/assets/profile.png');
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-jrs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentId,
          name,
          schoolGrade: grade, 
        }),
      });

      if (!res.ok) throw new Error('자녀 등록 실패');

      onSubmit();
    } catch (err) {
      alert('등록 중 오류 발생');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8 w-full max-w-xs mx-auto">
      {/* 프로필 사진 */}
      <div className="relative self-start">
        <div className="cursor-pointer">
          <Image
            src={profileUrl}
            alt="프로필"
            width={60}
            height={60}
            className="rounded-full border border-primary object-cover w-[60px] h-[60px]"
          />
        </div>
        <button
          type="button"
          className="absolute -bottom-0 -right-0 bg-primary w-5 h-5 rounded-full flex items-center justify-center text-white text-xs pointer-events-none"
        >
          +
        </button>
      </div>

      {/* 이름 입력 */}
      <div className="w-full">
        <label className="block text-sm font-medium mb-2">이름 (닉네임)</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름을 입력하세요" />
      </div>

      {/* 학년 선택 */}
      <div className="w-full">
        <label className="block text-sm font-medium mb-1">학년</label>
        <Select value={grade.toString()} onValueChange={(v) => setGrade(Number(v))}>
          <SelectTrigger className="w-full h-12">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {gradeOptions.map((g) => (
              <SelectItem key={g.value} value={g.value.toString()}>
                {g.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 버튼 */}
      <div className="w-full flex flex-col gap-1 mt-4">
        <Button type="submit" className="bg-primary text-white mb-2" size="lg" disabled={uploading}>
          {uploading ? '등록 중...' : mode === 'edit' ? '수정 완료' : '확인'}
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
