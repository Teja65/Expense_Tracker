import { Link } from 'react-router-dom';

import { Wallet, PieChart, ShieldCheck } from 'lucide-react';
import { useAppSelector } from '../app/hooks';

export default function Home() {
  const { user, initialized } = useAppSelector((state) => state.auth);

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950'>
      <section className='mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center'>
        <div className='rounded-full bg-cyan-100 px-5 py-2 text-sm font-semibold text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300'>
          Smart Expense Tracking
        </div>

        <h1 className='mt-8 max-w-4xl text-5xl font-black leading-tight text-slate-900 dark:text-white md:text-7xl'>
          Track Expenses
          <span className='text-cyan-600'> With Powerful</span> Analytics
        </h1>

        <p className='mt-8 max-w-2xl text-lg text-slate-600 dark:text-slate-300'>
          Manage your expenses, visualize spending trends, monitor monthly
          reports, and analyze category spending with modern dashboards.
        </p>

        <div className='mt-10 flex flex-wrap justify-center gap-5'>
          {user ? (
            <Link
              to='/dashboard'
              className='rounded-2xl bg-cyan-600 px-8 py-4 font-semibold text-white transition hover:bg-cyan-700'
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to='/signup'
                className='rounded-2xl bg-cyan-600 px-8 py-4 font-semibold text-white transition hover:bg-cyan-700'
              >
                Get Started
              </Link>

              {initialized && (
                <Link
                  to='/login'
                  className='rounded-2xl border border-slate-300 px-8 py-4 font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-900'
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>

        <div className='mt-20 grid w-full gap-6 md:grid-cols-3'>
          <div className='rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-900'>
            <Wallet className='text-cyan-600' />

            <h2 className='mt-5 text-2xl font-bold'>Expense Tracking</h2>

            <p className='mt-3 text-slate-500'>
              Add, edit and organize expenses with categories.
            </p>
          </div>

          <div className='rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-900'>
            <PieChart className='text-cyan-600' />

            <h2 className='mt-5 text-2xl font-bold'>Analytics Dashboard</h2>

            <p className='mt-3 text-slate-500'>
              Beautiful charts and reports powered by Recharts.
            </p>
          </div>

          <div className='rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-900'>
            <ShieldCheck className='text-cyan-600' />

            <h2 className='mt-5 text-2xl font-bold'>Secure JWT Auth</h2>

            <p className='mt-3 text-slate-500'>
              Firebase authentication with secure JWT backend.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
