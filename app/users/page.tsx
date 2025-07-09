'use client';

import { useState } from 'react';
import { ChildCard } from './components/ChildCard';
import { AddChildCard } from './components/AddChildCard';

export default function UsersPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const children = [
    { name: '자녀 1', grade: '초등학교 4학년' },
    { name: '자녀 2', grade: '초등학교 3학년' },
    { name: '자녀 3', grade: '초등학교 3학년' },
    { name: '자녀 4', grade: '초등학교 3학년' },
    { name: '자녀 5', grade: '초등학교 3학년' },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">자녀 관리</h2>
      <div className="grid grid-cols-2 gap-5">
        {children.map((child, index) => (
          <ChildCard
            key={index}
            name={child.name}
            grade={child.grade}
            selected={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
        <AddChildCard />
      </div>
    </div>
  );
}
