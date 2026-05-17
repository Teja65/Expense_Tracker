import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-50 px-6 dark:bg-slate-950'>
      <div className='w-full max-w-lg'>
        <LoginForm />
      </div>
    </div>
  );
}
