import Image from 'next/image';
import Link from 'next/link';

export function RootHeader() {
  return (
    <header className="mb-[35px]">
      <nav className="flex justify-between items-center">
        <li>
          <Link href="/">
            <Image
              src="/assets/logo.svg"
              alt="logo"
              width={90}
              height={30}
              className="min-h-[35px]"
            />
          </Link>
        </li>
      </nav>
    </header>
  );
}
