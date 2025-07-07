import Image from 'next/image';
import Link from 'next/link';

export function RootHeader() {
  return (
    <header className="mb-[35px]">
      <nav className="flex justify-between items-center">
        <li>
          <Link href="/">
            <Image src="/assets/logo.png" alt="logo" width={80} height={50} />
          </Link>
        </li>
        <li>
          <Link href="/">
            <Image src="/assets/profile.png" alt="logo" width={50} height={50} />
          </Link>
        </li>
      </nav>
    </header>
  );
}
