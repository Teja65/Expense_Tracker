import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';

const features = [
  {
    title: 'Track spending',
    description:
      'Capture expenses fast with a clean interface and recurring categories.',
  },
  {
    title: 'Budget planning',
    description: 'Set monthly budgets and compare actuals against targets.',
  },
  {
    title: 'Secure auth',
    description:
      'Login with email and secure Firebase authentication for each user.',
  },
];

export default function HomePage() {
  return (
    <main className='relative overflow-hidden bg-slate-950 text-slate-100'>
      <div className='absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-cyan-600/40 to-transparent' />
      <Container>
        <section className='relative py-16 md:py-24'>
          <div className='grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center'>
            <div className='space-y-8'>
              <span className='inline-flex rounded-full bg-cyan-500/15 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200'>
                Expense tracking reimagined
              </span>
              <div className='space-y-6'>
                <h1 className='max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl'>
                  Keep your budget aligned, not overwhelming.
                </h1>
                <p className='max-w-2xl text-lg leading-8 text-slate-300'>
                  Build a modern expense tracker with secure authentication,
                  better insights, and a responsive design that adapts across
                  devices.
                </p>
              </div>
              <div className='flex flex-col gap-4 sm:flex-row'>
                <Link to='/signup'>
                  <Button className='w-full sm:w-auto'>Get started</Button>
                </Link>
                <Link to='/login' className='w-full sm:w-auto'>
                  <Button variant='secondary' className='w-full sm:w-auto'>
                    Log in
                  </Button>
                </Link>
              </div>
            </div>

            <div className='rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40'>
              <div className='rounded-[1.75rem] bg-slate-950 p-8 text-slate-100 shadow-[0_40px_120px_-40px_rgba(14,165,233,0.4)]'>
                <p className='text-sm uppercase tracking-[0.24em] text-cyan-300'>
                  Quick overview
                </p>
                <h2 className='mt-6 text-3xl font-semibold'>
                  A cleaner way to manage your cash flow.
                </h2>
                <p className='mt-4 text-slate-400'>
                  Everything is organized into budgets, expenses, and secure
                  account state so you can scale the frontend reliably.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className='py-16'>
          <div className='grid gap-6 md:grid-cols-3'>
            {features.map((feature) => (
              <article
                key={feature.title}
                className='rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20'
              >
                <h3 className='text-xl font-semibold text-white'>
                  {feature.title}
                </h3>
                <p className='mt-3 text-slate-400'>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
