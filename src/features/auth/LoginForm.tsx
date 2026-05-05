import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { loginWithEmail } from './authAPI';
import { setUser } from './authSlice';
import { authSchema } from '../../utils/validators';
import type { AuthFormValues } from '../../types';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({ mode: 'onSubmit' });
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (values: AuthFormValues) => {
    const result = authSchema.safeParse(values);
    if (!result.success) {
      return;
    }

    try {
      const response = await loginWithEmail(result.data);
      dispatch(setUser(response));
      navigate('/dashboard');
    } catch (error) {
      setServerError('Unable to sign in. Please check your credentials.');
    }
  };

  return (
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
        className='w-full rounded-2xl bg-cyan-500 px-5 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400'
      >
        Log in
      </button>
    </form>
  );
}
