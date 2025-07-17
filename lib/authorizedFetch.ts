export async function authorizedFetch(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem('accessToken');

  const requestWithToken = (token: string) =>
    fetch(input, {
      ...init,
      headers: {
        ...(init.headers || {}),
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

  let res = await requestWithToken(token || '');

  if (res.status === 401) {
    console.warn('accessToken 만료 → refresh 시도');

    const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!refreshRes.ok) {
      throw new Error('refresh 실패 → 재로그인 필요');
    }

    const { accessToken: newToken } = await refreshRes.json();
    localStorage.setItem('accessToken', newToken);

    res = await requestWithToken(newToken);
  }

  return res;
}
