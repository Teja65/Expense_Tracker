import { useMemo } from 'react';
import { useAppSelector } from '../app/hooks';

export function useAuth() {
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useMemo(() => Boolean(token && user), [token, user]);

  return {
    user,
    token,
    isAuthenticated,
  };
}
