import SignupForm from '../components/auth/SignupForm';

export default function Signup() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-50 px-6 dark:bg-slate-950'>
      <div className='animate-rise w-full max-w-lg'>
        <SignupForm />
      </div>
    </div>
  );
}
