'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, Users } from 'lucide-react';

export function MenuBar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      id: 'home',
      label: '홈',
      icon: Home,
      path: '/',
    },
    {
      id: 'users',
      label: '마이페이지',
      icon: Users,
      path: '/users',
    },
  ];

  const handleMenuClick = (path: string) => {
    router.push(path);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <footer className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[calc(var(--space-mobileMax)-2px)] backdrop-blur-md border-t border-zinc-200/50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50">
      <div className="flex items-center justify-around py-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.path)}
              className={`flex flex-col items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
                active ? 'text-primary' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </footer>
  );
}
