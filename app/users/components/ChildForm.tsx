"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface ChildFormProps {
  mode?: "register" | "edit";
  defaultValues?: {
    name: string;
    grade: string;
    profileUrl?: string;
  };
  onSubmit: (data: { name: string; grade: string }) => void;
  onCancel?: () => void;
}

export function ChildForm({
  mode = "register",
  defaultValues,
  onSubmit,
  onCancel,
}: ChildFormProps) {
  const [name, setName] = useState(defaultValues?.name || "");
  const [grade, setGrade] = useState(defaultValues?.grade || "초등 1학년");
  const [profileUrl, setProfileUrl] = useState(defaultValues?.profileUrl || "/assets/profile.png");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileUrl(imageUrl);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name, grade });
      }}
      className="flex flex-col items-center gap-8 w-full max-w-xs mx-auto"
    >
      {/* 프로필 이미지 + 업로드 */}
      <div className="relative self-start">
        <div onClick={handleImageClick} className="cursor-pointer">
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

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/* 이름 */}
      <div className="w-full">
        <label className="block text-sm font-medium mb-2">이름 (닉네임)</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
        />
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium mb-1">학년</label>
        <Select value={grade} onValueChange={(v) => setGrade(v)}>
          <SelectTrigger className="w-full h-12 w-full">
            <SelectValue placeholder="학년 선택" />
          </SelectTrigger>
          <SelectContent>
            {["초등 1학년", "초등 2학년", "초등 3학년", "초등 4학년", "초등 5학년", "초등 6학년"].map(
              (g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full flex flex-col gap-1 mt-4">
        <Button type="submit" className="bg-primary text-white mb-2" size={"lg"}>
          {mode === "edit" ? "수정 완료" : "확인"}
        </Button>
        {onCancel && (
          <Button variant="secondary" type="button" onClick={onCancel} size={"lg"}>
            취소
          </Button>
        )}
      </div>
    </form>
  );
}
