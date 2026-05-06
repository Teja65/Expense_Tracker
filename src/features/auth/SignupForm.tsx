import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { signupWithEmail, loginWithGoogle, loginWithGithub } from './authAPI';
import { setUser } from './authSlice';
import { signupSchema } from '../../utils/validators';
import type { AuthFormValues } from '../../types';

export default function SignupForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({ mode: 'onSubmit' });
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: AuthFormValues) => {
    const result = signupSchema.safeParse(values);
    if (!result.success) {
      return;
    }

    try {
      setIsLoading(true);
      setServerError(null);
      const response = await signupWithEmail(result.data);
      dispatch(setUser(response));
      navigate('/dashboard');
    } catch (error) {
      setServerError('Unable to create an account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setServerError(null);
      const response = await loginWithGoogle();
      dispatch(setUser(response));
      navigate('/dashboard');
    } catch (error) {
      setServerError('Unable to sign up with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      setIsLoading(true);
      setServerError(null);
      const response = await loginWithGithub();
      dispatch(setUser(response));
      navigate('/dashboard');
    } catch (error) {
      setServerError('Unable to sign up with GitHub. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      {/* Social Signup Buttons */}
      <div className='space-y-3'>
        <button
          type='button'
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className='flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <svg className='h-5 w-5' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
            />
            <path
              fill='currentColor'
              d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
            />
            <path
              fill='currentColor'
              d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
            />
            <path
              fill='currentColor'
              d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
            />
          </svg>
          Continue with Google
        </button>

        <button
          type='button'
          onClick={handleGithubLogin}
          disabled={isLoading}
          className='flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
          </svg>
          Continue with GitHub
        </button>
      </div>

      {/* Divider */}
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-slate-700' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='bg-slate-950 px-2 text-slate-400'>
            Or continue with email
          </span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-6 rounded-3xl border border-slate-700 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30'
      >
        <div>
          <label
            className='block text-sm font-semibold text-slate-300'
            htmlFor='email'
          >
            Email
          </label>
          <input
            id='email'
            type='email'
            {...register('email', { required: true })}
            className='mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
          />
          {errors.email && (
            <p className='mt-2 text-sm text-rose-400'>
              Please enter a valid email.
            </p>
          )}
        </div>

        <div>
          <label
            className='block text-sm font-semibold text-slate-300'
            htmlFor='password'
          >
            Password
          </label>
          <input
            id='password'
            type='password'
            {...register('password', { required: true, minLength: 6 })}
            className='mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
          />
          {errors.password && (
            <p className='mt-2 text-sm text-rose-400'>
              Password must be at least 6 characters.
            </p>
          )}
        </div>

        {serverError && <p className='text-sm text-rose-400'>{serverError}</p>}

        <button
          type='submit'
          disabled={isLoading}
          className='w-full rounded-2xl bg-cyan-500 px-5 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
    </div>
  );
}
