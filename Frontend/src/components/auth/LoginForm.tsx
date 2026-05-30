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
import Button from '../ui/Button';
import Form from '../ui/Form';
import Input from '../ui/Input';
import { Heading2, Paragraph } from '../ui/Text';
import en from '../../en.json';

type FormData = {
  email: string;

  password: string;
};

const GOOGLE_EMAILS_KEY = 'expense-google-login-emails';

const loginText = en.auth.login;
const authErrors = en.auth.errors;
const validationText = en.auth.validation;

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
      return authErrors.emailInvalid;

    case 'auth/user-not-found':
    case 'auth/invalid-credential':
      return authErrors.invalidCredential;

    case 'auth/wrong-password':
      return authErrors.wrongPassword;

    case 'auth/too-many-requests':
      return authErrors.tooManyRequests;

    case 'auth/network-request-failed':
      return authErrors.network;

    default:
      return authErrors.loginFailed;
  }
};

const getGoogleAuthErrorMessage = (error: unknown) => {
  const code = getFirebaseCode(error);

  switch (code) {
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return null;

    case 'auth/popup-blocked':
      return authErrors.popupBlocked;

    case 'auth/unauthorized-domain':
      return authErrors.unauthorizedDomain;

    case 'auth/network-request-failed':
      return authErrors.googleNetwork;

    default:
      return authErrors.googleFailed;
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
        toast.error(loginText.googleOnly);
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

      toast.success(loginText.success);

      navigate(ROUTES.dashboard);
    } catch (error) {
      const code = getFirebaseCode(error);

      if (
        (code === 'auth/invalid-credential' ||
          code === 'auth/wrong-password' ||
          code === 'auth/user-not-found') &&
        (await isGoogleOnlyEmail(email).catch(() => false))
      ) {
        toast.error(loginText.googleOnly);
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

      toast.success(loginText.googleSuccess);

      navigate(ROUTES.dashboard);
    } catch (error) {
      if (!getFirebaseCode(error).startsWith('auth/')) {
        toast.error(
          loginText.backendSessionFailed,
        );
      }
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 px-6 dark:bg-zinc-950'>
      <div className='animate-rise w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl dark:bg-zinc-900'>
        <Heading2 className='mb-6 text-center text-3xl font-black'>
          {loginText.title}
        </Heading2>

        <Form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <div>
            <Input
              type='email'
              placeholder={loginText.emailPlaceholder}
              {...register('email', {
                required: validationText.emailRequired,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: validationText.emailInvalid,
                },
              })}
            />

            {errors.email && (
              <Paragraph className='mt-2 text-sm text-red-500'>
                {errors.email.message}
              </Paragraph>
            )}
          </div>

          <div>
            <Input
              type='password'
              placeholder={loginText.passwordPlaceholder}
              {...register('password', {
                required: validationText.passwordRequired,
                minLength: {
                  value: 6,
                  message: validationText.passwordMin,
                },
              })}
            />

            {errors.password && (
              <Paragraph className='mt-2 text-sm text-red-500'>
                {errors.password.message}
              </Paragraph>
            )}
          </div>

          <Button
            type='submit'
            disabled={isSubmitting}
            className='w-full rounded-2xl bg-emerald-600 py-3 font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60'
          >
            {isSubmitting ? loginText.submitting : loginText.submit}
          </Button>
        </Form>

        <Button
          type='button'
          disabled={isSubmitting || isGoogleSubmitting}
          onClick={handleGoogleLogin}
          className='mt-4 w-full rounded-2xl border border-zinc-300 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700'
        >
          {isGoogleSubmitting ? loginText.googleSubmitting : loginText.google}
        </Button>
      </div>
    </div>
  );
}
