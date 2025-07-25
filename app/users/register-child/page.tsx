'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChildForm } from '../components/ChildForm';
import { useUserStore } from '@/stores/useUserStore';

export default function RegisterChildPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요합니다.');
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-6">자녀 등록</h2>
      <ChildForm
        mode="register"
        parentId={user.userId} 
        onSubmit={() => router.push('/users')}
        onCancel={() => router.push('/users')}
      />
    </div>
  );
}
