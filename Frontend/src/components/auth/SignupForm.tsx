import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

import { auth } from '../../services/firebase';
import { checkAuthEmail, loginUser } from '../../features/auth/authAPI';
import { useAppDispatch } from '../../store/hooks';
import { setUser } from '../../store/authSlice';
import { ROUTES } from '../../routes/routes';

type FormData = {
  name: string;

  email: string;

  password: string;
};

const getSignupErrorMessage = (error: unknown) => {
  const code =
    typeof error === 'object' && error && 'code' in error
      ? String(error.code)
      : '';

  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Please login instead.';

    case 'auth/invalid-email':
      return 'Please enter a valid email address.';

    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';

    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again.';

    case 'auth/operation-not-allowed':
      return 'Email/password signup is not enabled in Firebase Authentication.';

    default:
      return 'Signup failed. Please try again.';
  }
};

export default function SignupForm() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    const email = data.email.trim().toLowerCase();

    try {
      const existingEmail = await checkAuthEmail(email).catch(() => null);

      if (existingEmail?.exists) {
        if (
          existingEmail.provider === 'google' ||
          existingEmail.providers.includes('google.com')
        ) {
          toast.error(
            'This email is already linked with Google. Please use Continue with Google.',
          );
          return;
        }

        toast.error('An account with this email already exists. Please login.');
        return;
      }

      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        data.password,
      );

      await updateProfile(credential.user, {
        displayName: data.name.trim(),
      });

      const token = await credential.user.getIdToken(true);

      try {
        const user = await loginUser(token);

        dispatch(setUser(user));

        toast.success('Account created successfully');

        navigate(ROUTES.dashboard);
      } catch {
        toast.success('Account created. Please login after starting backend.');

        navigate(ROUTES.login);
      }
    } catch (error) {
      toast.error(getSignupErrorMessage(error));
    }
  };

  return (
    <div className='rounded-3xl bg-white p-8 shadow-2xl dark:bg-zinc-900'>
      <h2 className='mb-6 text-center text-3xl font-black'>Create Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <div>
          <input
            type='text'
            placeholder='Name'
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
            className='w-full rounded-2xl border border-zinc-300 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950'
          />

          {errors.name && (
            <p className='mt-2 text-sm text-red-500'>{errors.name.message}</p>
          )}
        </div>

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
          {isSubmitting ? 'Creating account...' : 'Signup'}
        </button>
      </form>
    </div>
  );
}
