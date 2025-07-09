import Image from 'next/image';

export function Problem() {
  return (
    <section className="mb-10">
      <h3 className="text-xl font-bold mb-5">문제</h3>
      <div className="relative w-full aspect-[280/200] mb-2.5">
        <Image src="/assets/example.png" alt="logo" fill className="object-fit" />
      </div>
      <p className="px-2">반지름이 5cm인 원의 둘레를 구하세요. (단, π = 3.14)</p>
    </section>
  );
}
