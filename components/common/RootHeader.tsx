import Image from 'next/image';
import Link from 'next/link';

export function RootHeader() {
  return (
    <header className="mb-[35px]">
      <nav className="flex justify-between items-center">
        <li>
          <Link href="/">
            <Image src="/assets/logo.svg" alt="logo" width={90} height={60} />
          </Link>
        </li>
      </nav>
    </header>
  );
}
