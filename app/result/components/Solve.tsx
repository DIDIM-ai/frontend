import { Files } from 'lucide-react';
import { useState } from 'react';

interface ExplanationStep {
  title: string;
  description: string;
}

interface SolveProps {
  problem: {
    answer: string;
    parent_explanation: string;
    explanation_steps: ExplanationStep[];
  };
}

export function Solve({ problem }: SolveProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (description: string, idx: number) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(description);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 3000);
    }
  };

  return (
    <section className="mb-10">
      <div className="mb-10">
        <h3 className="text-xl font-bold mb-5">정답</h3>
        <p className="mb-5">{problem.answer}</p>
      </div>

      <div className="mb-10 bg-gray-100 p-3 rounded-lg">
        <h3 className="text-xl text-primary font-bold mb-5">이렇게 알려주세요!</h3>
        <p className="mb-5 text-sm text-[#1a1a1a]">{problem.parent_explanation}</p>
      </div>

      <div className="">
        <h3 className="text-xl font-bold">단계 별 풀이</h3>
        <div className="flex flex-col gap-5">
          {problem.explanation_steps.map((item, idx) => (
            <div className="py-5" key={idx}>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p>{item.description}</p>
              <div className="flex justify-end mt-2 text-gray-500 relative">
                <div
                  className={`relative cursor-pointer p-1 rounded transition duration-150 ease-in-out ${
                    copiedIdx === idx ? 'text-primary scale-110' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleCopy(item.description, idx)}
                  title="복사하기"
                >
                  <Files size={16} strokeWidth={1.5} />
                  {copiedIdx === idx && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow z-10 whitespace-nowrap">
                      복사 완료!
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
