interface ExplanationStep {
  title: string;
  description: string;
}

interface SolveProps {
  problem: {
    parent_explanation: string;
    explanation_steps: ExplanationStep[];
  };
}

export function Solve({ problem }: SolveProps) {
  return (
    <section className="mb-10">
      <div className="mb-10">
        <h3 className="text-xl text-primary font-bold mb-5">이렇게 알려주세요!</h3>
        <p className="mb-5 text-gray-500">{problem.parent_explanation}</p>
      </div>

      <div className="">
        <h3 className="text-xl font-bold">단계 별 풀이</h3>
        <div className="flex flex-col gap-5">
          {problem.explanation_steps.map((item, idx) => (
            <div className="border-b border-gray-100 py-5" key={idx}>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
