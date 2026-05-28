import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

import toast from 'react-hot-toast';

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { auth } from '../../services/firebase';

import { checkAuthEmail, loginUser } from '../../features/auth/authAPI';
import { useAppDispatch } from '../../store/hooks';
import { setUser } from '../../store/authSlice';
import { ROUTES } from '../../routes/routes';

type FormData = {
  email: string;

  password: string;
};

const GOOGLE_EMAILS_KEY = 'expense-google-login-emails';

const googleLoginMessage =
  'This email is registered with Google. Please use Continue with Google.';

const getFirebaseCode = (error: unknown) =>
  typeof error === 'object' && error && 'code' in error
    ? String(error.code)
    : '';

const getStoredGoogleEmails = () => {
  try {
    return JSON.parse(localStorage.getItem(GOOGLE_EMAILS_KEY) || '[]') as string[];
  } catch {
    return [];
  }
};

const rememberGoogleEmail = (email: string | null) => {
  if (!email) {
    return;
  }

  const normalizedEmail = email.toLowerCase();
  const emails = getStoredGoogleEmails();

  if (!emails.includes(normalizedEmail)) {
    localStorage.setItem(
      GOOGLE_EMAILS_KEY,
      JSON.stringify([...emails, normalizedEmail]),
    );
  }
};

const isRememberedGoogleEmail = (email: string) =>
  getStoredGoogleEmails().includes(email.toLowerCase());

const isGoogleOnlyEmail = async (email: string) => {
  if (isRememberedGoogleEmail(email)) {
    return true;
  }

  const savedEmail = await checkAuthEmail(email).catch(() => null);

  if (
    savedEmail?.provider === 'google' ||
    savedEmail?.providers.includes('google.com')
  ) {
    return true;
  }

  return false;
};

const getLoginErrorMessage = (error: unknown) => {
  const code = getFirebaseCode(error);

  switch (code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';

    case 'auth/user-not-found':
    case 'auth/invalid-credential':
      return 'Invalid email or password. If you created this account with Google, use Continue with Google.';

    case 'auth/wrong-password':
      return 'Incorrect password.';

    case 'auth/too-many-requests':
      return 'Too many login attempts. Please try again later.';

    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again.';

    default:
      return 'Login failed. Please try again.';
  }
};

const getGoogleAuthErrorMessage = (error: unknown) => {
  const code = getFirebaseCode(error);

  switch (code) {
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return null;

    case 'auth/popup-blocked':
      return 'Google sign-in popup was blocked. Please allow popups and try again.';

    case 'auth/unauthorized-domain':
      return 'This domain is not authorized in Firebase Authentication.';

    case 'auth/network-request-failed':
      return 'Network error during Google sign-in. Please check your connection and try again.';

    default:
      return 'Google sign-in failed. Please try again.';
  }
};

export default function LoginForm() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    const email = data.email.trim();

    try {
      if (await isGoogleOnlyEmail(email)) {
        toast.error(googleLoginMessage);
        return;
      }

      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        data.password,
      );
      const token = await credential.user.getIdToken();
      const user = await loginUser(token);

      dispatch(setUser(user));

      toast.success('Login Successful');

      navigate(ROUTES.dashboard);
    } catch (error) {
      const code = getFirebaseCode(error);

      if (
        (code === 'auth/invalid-credential' ||
          code === 'auth/wrong-password' ||
          code === 'auth/user-not-found') &&
        (await isGoogleOnlyEmail(email).catch(() => false))
      ) {
        toast.error(googleLoginMessage);
        return;
      }

      toast.error(getLoginErrorMessage(error));
    }
  };

  const handleGoogleLogin = async () => {
    if (isGoogleSubmitting) {
      return;
    }

    setIsGoogleSubmitting(true);

    try {
      const provider = new GoogleAuthProvider();

      const credential = await signInWithPopup(auth, provider).catch((error) => {
        const message = getGoogleAuthErrorMessage(error);

        if (message) {
          toast.error(message);
        }

        throw error;
      });

      const token = await credential.user.getIdToken();
      const user = await loginUser(token);

      rememberGoogleEmail(credential.user.email);

      dispatch(setUser(user));

      toast.success('Google Login Successful');

      navigate(ROUTES.dashboard);
    } catch (error) {
      if (!getFirebaseCode(error).startsWith('auth/')) {
        toast.error(
          'Google authentication succeeded, but the app could not start your session. Please try again.',
        );
      }
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <div className='rounded-3xl bg-white p-8 shadow-2xl dark:bg-zinc-900'>
      <h2 className='mb-6 text-center text-3xl font-black'>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <div>
          <input
            type='email'
            placeholder='Email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            })}
            className='w-full rounded-2xl border border-zinc-300 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950'
          />

          {errors.email && (
            <p className='mt-2 text-sm text-red-500'>{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type='password'
            placeholder='Password'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            className='w-full rounded-2xl border border-zinc-300 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950'
          />

          {errors.password && (
            <p className='mt-2 text-sm text-red-500'>
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className='w-full rounded-2xl bg-emerald-600 py-3 font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60'
        >
          {isSubmitting ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <button
        type='button'
        disabled={isSubmitting || isGoogleSubmitting}
        onClick={handleGoogleLogin}
        className='mt-4 w-full rounded-2xl border border-zinc-300 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700'
      >
        {isGoogleSubmitting ? 'Waiting for Google...' : 'Continue with Google'}
      </button>
    </div>
  );
}
