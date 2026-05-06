import { auth } from '../../services/firebase';
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
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
      displayName: credential.user.displayName ?? '',
      photoURL: credential.user.photoURL ?? '',
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
      displayName: credential.user.displayName ?? '',
      photoURL: credential.user.photoURL ?? '',
    },
    token,
  };
}

export async function loginWithGoogle() {
  await setPersistence(auth, browserLocalPersistence);
  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  provider.addScope('profile');

  const result = await signInWithPopup(auth, provider);
  const token = await result.user.getIdToken();

  return {
    user: {
      uid: result.user.uid,
      email: result.user.email ?? '',
      displayName: result.user.displayName ?? '',
      photoURL: result.user.photoURL ?? '',
    },
    token,
  };
}

export async function loginWithGithub() {
  await setPersistence(auth, browserLocalPersistence);
  const provider = new GithubAuthProvider();
  provider.addScope('user:email');

  const result = await signInWithPopup(auth, provider);
  const token = await result.user.getIdToken();

  return {
    user: {
      uid: result.user.uid,
      email: result.user.email ?? '',
      displayName: result.user.displayName ?? '',
      photoURL: result.user.photoURL ?? '',
    },
    token,
  };
}

export async function logout() {
  await auth.signOut();
}
