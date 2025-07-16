import Image from 'next/image';

interface ListCardProps {
  id: string | number;
  imageSrc?: string;
  text: string;
  date: string;
}

export function ListCard({ id, imageSrc, text, date }: ListCardProps) {
  return (
    <li key={id} className="flex items-center gap-2.5 border border-gray-300 rounded-[5px] p-2.5">
      <Image src={imageSrc || '/assets/example.png'} width={80} height={80} alt="분석결과 썸네일" />

      <div className="flex flex-col gap-[5px]">
        <p className="text-sm">{text}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </li>
  );
}
