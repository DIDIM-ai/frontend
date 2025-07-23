'use client';

import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import { toast } from 'sonner';
import { authorizedFetch } from '@/lib/authorizedFetch';

export function LogoutButton() {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      const res = await authorizedFetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/logout`, {
        method: 'POST'
      });

      if (!res.ok) throw new Error('로그아웃 실패');

      localStorage.removeItem('accessToken');
      clearUser();
      toast.success('로그아웃 되었습니다.');
      router.push('/login');
    } catch (err) {
      console.error('로그아웃 오류:', err);
      toast.error('로그아웃에 실패했습니다.');
    }
  };

  return (
    <button onClick={handleLogout} className='cursor-pointer'>
      로그아웃
    </button>
  );
}
