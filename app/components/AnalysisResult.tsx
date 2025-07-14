import { ListCard } from '@/components/ui/listcard';

export function AnalysisResult() {
  const results = [
    {
      id: 1,
      imageSrc: '/assets/example.png',
      text: '반지름이 7cm인 원의 둘레를 구하세요. (단, π = 3.14)',
      date: '2025.06.29',
    },
    {
      id: 2,
      imageSrc: '/assets/example.png',
      text: '반지름이 7cm인 원의 둘레를 구하세요. (단, π = 3.14)',
      date: '2025.06.29',
    },
    {
      id: 3,
      imageSrc: '/assets/example.png',
      text: '반지름이 7cm인 원의 둘레를 구하세요. (단, π = 3.14)',
      date: '2025.06.29',
    },
  ];

  return (
    <section>
      <h3 className="text-xl font-bold mb-2.5">최근 분석 결과</h3>
      <ul className="flex flex-col gap-2.5">
        {results.map((item) => (
          <ListCard
            key={item.id}
            id={item.id}
            imageSrc={item.imageSrc}
            text={item.text}
            date={item.date}
          />
        ))}
      </ul>
    </section>
  );
}
