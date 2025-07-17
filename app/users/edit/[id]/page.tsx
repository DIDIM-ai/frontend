'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChildForm } from '@/app/users/components/ChildForm';

type UserInputType = {
  id: number;
  parentId: number;
  name: string;
  grade: number;
  profileUrl?: string;
};

export default function EditChildPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [userInput, setUserInput] = useState<UserInputType | null>(null);

  useEffect(() => {
    const fetchChild = async () => {
      if (!id) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-jrs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        const data = await res.json();
        console.log("data: ", data);
        setUserInput({
          id: data.id,
          parentId: data.parentId,
          name: data.name,
          grade: data.schoolGrade,
          profileUrl: '/assets/profile.png',
        });
      } catch (err) {
        alert('자녀 정보 불러오기 실패');
        router.push('/users');
      }
    };

    fetchChild();
  }, [id]);

  if (!userInput) return <div>로딩 중...</div>;

  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold mb-6">자녀 정보 수정</h2>
      <ChildForm
        mode="edit"
        parentId={userInput.parentId}
        userInput={userInput}
        onSubmit={() => router.push('/users')}
        onCancel={() => router.push('/users')}
      />
    </div>
  );
}