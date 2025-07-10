'use client';

import { useRouter } from 'next/navigation';
import { ChildForm } from '../components/ChildForm';

export default function RegisterChildPage() {
  const router = useRouter();

  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold mb-6">자녀 등록</h2>
      <ChildForm
        mode="register"
        onSubmit={(data) => {
          console.log('등록됨:', data);
          router.push('/users');
        }}
        onCancel={() => console.log("취소 클릭됨")}
      />
    </div>
  );
}
