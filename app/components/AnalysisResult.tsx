import Image from 'next/image';

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

export function AnalysisResult() {
  return (
    <section>
      <h3 className="text-xl font-bold mb-2.5">최근 분석 결과</h3>
      <ul className="flex flex-col gap-2.5">
        {results.map(({ id, imageSrc, text, date }) => (
          <li
            key={id}
            className="flex items-center gap-2.5 border border-gray-300 rounded-[5px] p-2.5"
          >
            <Image src={imageSrc} width={70} height={60} alt="분석결과 썸네일" />
            <div className="flex flex-col gap-[5px]">
              <p className="text-sm">{text}</p>
              <p className="text-xs text-gray-500">{date}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
