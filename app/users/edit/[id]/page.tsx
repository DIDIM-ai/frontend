'use client';

import { useRouter } from 'next/navigation';
import { ChildForm } from '../../components/ChildForm';

export default function EditChildPage() {
  const router = useRouter();

  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold mb-6">자녀 등록</h2>
      <ChildForm
        mode="edit"
        onSubmit={(data) => {
          console.log('수정됨:', data);
          router.push('/users');
        }}
        onCancel={() => router.push('/users')}
      />
    </div>
  );
}
