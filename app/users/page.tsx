'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ChildCard } from './components/ChildCard';
import { AddChildCard } from './components/AddChildCard';
import { EmptyChildCard } from './components/EmptyChild';
import { AnalysisCard } from './components/AnalysisCard'; 
import { WithdrawButton } from './components/WithdrawButton';

export default function UsersPage() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const children = [
    {
      name: '자녀 1',
      grade: '초등학교 4학년',
      analyses: Array.from({ length: 20 }, (_, i) => ({
        imageUrl: '/assets/example.png',
        description: `문제 ${i + 1}입니다. 자녀의 문제 풀이 분석입니다.`,
        date: '2025.07.10',
      })),
    },
    {
      name: '자녀 2',
      grade: '초등학교 3학년',
      analyses: [],
    },
    {
      name: '자녀 3',
      grade: '초등학교 6학년',
      analyses: [],
    },
  ];

  //const children: { name: string; grade: string; analyses: { imageUrl: string; description: string; date: string; }[] }[] = [];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">자녀 관리</h2>

      {children.length === 0 ? (
        <EmptyChildCard onRegisterClick={() => router.push('/users/register-child')} />
      ) : (
        <div className='flex justify-center mb-4'>
          <div className="grid grid-cols-2 gap-6">
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
        </div>
      )}

      <h2 className="text-lg font-semibold my-4">이전 분석 기록</h2>

      {selectedIndex !== null && (
        <AnalysisCard analyses={children[selectedIndex].analyses} />
      )}

      <div className="flex flex-col items-start gap-4 mt-10 text-sm text-gray-300">
        <button onClick={() => { alert("로그아웃"); router.push("/login"); }}>로그아웃</button>
        <WithdrawButton />
      </div>
    </div>
  );
}
