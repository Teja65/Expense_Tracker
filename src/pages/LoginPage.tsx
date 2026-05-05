import LoginForm from '../features/auth/LoginForm';
import Container from '../components/ui/Container';

export default function LoginPage() {
  return (
    <main className='min-h-screen bg-slate-950 text-slate-100'>
      <Container>
        <section className='grid min-h-[calc(100vh-80px)] place-items-center py-16'>
          <div className='w-full max-w-2xl space-y-8 rounded-[2rem] border border-slate-800 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40'>
            <div>
              <p className='text-sm uppercase tracking-[0.24em] text-cyan-300'>
                Login
              </p>
              <h1 className='mt-4 text-3xl font-semibold text-white'>
                Sign in to your account
              </h1>
              <p className='mt-3 text-slate-400'>
                Access your expense dashboard and manage budgets securely.
              </p>
            </div>
            <LoginForm />
          </div>
        </section>
      </Container>
    </main>
  );
}
