import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

import { auth } from '../../services/firebase';
import { loginUser } from '../../features/auth/authAPI';
import { useAppDispatch } from '../../app/hooks';
import { setUser } from '../../features/auth/authSlice';

type FormData = {
  name: string;

  email: string;

  password: string;
};

export default function SignupForm() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await updateProfile(credential.user, {
        displayName: data.name,
      });

      const token = await credential.user.getIdToken(true);
      const user = await loginUser(token);

      dispatch(setUser(user));

      toast.success('Signup Successful');

      navigate('/dashboard');
    } catch {
      toast.error('Signup Failed');
    }
  };

  return (
    <div className='rounded-3xl bg-white p-8 shadow-2xl dark:bg-slate-900'>
      <h2 className='mb-6 text-center text-3xl font-black'>Create Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <input
          type='text'
          placeholder='Name'
          {...register('name')}
          className='w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950'
        />

        <input
          type='email'
          placeholder='Email'
          {...register('email')}
          className='w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950'
        />

        <input
          type='password'
          placeholder='Password'
          {...register('password')}
          className='w-full rounded-2xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-950'
        />

        <button className='w-full rounded-2xl bg-cyan-600 py-3 font-bold text-white hover:bg-cyan-700'>
          Signup
        </button>
      </form>
    </div>
  );
}
