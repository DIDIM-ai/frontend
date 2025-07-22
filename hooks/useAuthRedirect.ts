import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function useAuthRedirect() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setIsLoading(false);
      setShowLoginPrompt(true);

      return;
    }
    setIsLoading(true);
  }, [router]);

  const handleLoginClick = () => {
    setShowLoginPrompt(false);
    router.replace('/login');
  };

  return { isLoading, showLoginPrompt, handleLoginClick };
}
