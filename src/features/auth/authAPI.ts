import { auth } from '../../services/firebase';
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
} from 'firebase/auth';
import type { AuthFormValues } from '../../types';

export async function signupWithEmail(values: AuthFormValues) {
  await setPersistence(auth, browserLocalPersistence);
  const credential = await createUserWithEmailAndPassword(
    auth,
    values.email,
    values.password,
  );
  const token = await credential.user.getIdToken();

  return {
    user: {
      uid: credential.user.uid,
      email: credential.user.email ?? values.email,
    },
    token,
  };
}

export async function loginWithEmail(values: AuthFormValues) {
  await setPersistence(auth, browserLocalPersistence);
  const credential = await signInWithEmailAndPassword(
    auth,
    values.email,
    values.password,
  );
  const token = await credential.user.getIdToken();

  return {
    user: {
      uid: credential.user.uid,
      email: credential.user.email ?? values.email,
    },
    token,
  };
}
