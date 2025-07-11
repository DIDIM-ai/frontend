'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChildCard } from './components/ChildCard';
import { AddChildCard } from './components/AddChildCard';
import { EmptyChildCard } from './components/EmptyChild'; 

export default function UsersPage() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const children = [
    { name: '자녀 1', grade: '초등학교 4학년' },
    { name: '자녀 2', grade: '초등학교 3학년' },
    { name: '자녀 3', grade: '초등학교 3학년' },
    { name: '자녀 4', grade: '초등학교 3학년' },
    { name: '자녀 5', grade: '초등학교 3학년' },
  ];

  //const children: { name: string; grade: string }[] = [];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">자녀 관리</h2>

      {children.length === 0 ? (
        <EmptyChildCard onRegisterClick={() => router.push('/users/register-child')} />
      ) : (
        <div className="grid grid-cols-2 gap-5 mb-4">
          {children.map((child, index) => (
            <ChildCard
              key={index}
              id={`${index}`}
              name={child.name}
              grade={child.grade}
              selected={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
          <AddChildCard />
        </div>
      )}
      <h2 className="text-lg font-semibold mb-4">이전 분석 기록</h2>
    </div>
  );
}
