'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import { authorizedFetch } from '@/lib/authorizedFetch';

export default function SuccessPage() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const handleSuccessLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('accessToken');
      if (!token) return router.replace('/login');

      localStorage.setItem('accessToken', token);

      try {
        const userRes = await authorizedFetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test/api/temp/user/me`);
        if (!userRes.ok) throw new Error('사용자 정보 조회 실패');
        const user = await userRes.json();
        setUser(user);

        const childRes = await authorizedFetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-jrs/parent`);
        if (!childRes.ok) throw new Error('자녀 목록 조회 실패');
        const children = await childRes.json();

        if (!children || children.length === 0) {
          router.replace('/users/register-child');
        } else {
          router.replace('/');
        }
      } catch (err) {
        console.error('로그인 후 처리 실패:', err);
        localStorage.removeItem('accessToken');
        router.replace('/login');
      }
    };

    handleSuccessLogin();
  }, [router, setUser]);

  return null;
}
