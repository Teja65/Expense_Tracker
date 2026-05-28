import { useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../services/firebase';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import { clearUser, setInitialized, setUser } from '../store/authSlice';

import { getProfile } from '../features/auth/authAPI';

export default function useAuth() {
  const dispatch = useAppDispatch();

  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const user = await getProfile();

          dispatch(setUser(user));
        } else {
          dispatch(clearUser());
        }
      } catch {
        dispatch(clearUser());
      } finally {
        dispatch(setInitialized());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return authState;
}
