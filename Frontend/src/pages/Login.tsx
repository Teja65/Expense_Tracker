import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 px-6 dark:bg-zinc-950'>
      <div className='animate-rise w-full max-w-lg'>
        <LoginForm />
      </div>
    </div>
  );
}
