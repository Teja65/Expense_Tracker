import { useAppSelector } from '../app/hooks';
import Container from '../components/ui/Container';

export default function DashboardPage() {
  const userEmail = useAppSelector((state) => state.auth.user?.email);

  return (
    <main className='min-h-screen bg-slate-950 text-slate-100'>
      <Container>
        <section className='py-16'>
          <div className='rounded-[2rem] border border-slate-800 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40'>
            <div className='flex flex-col gap-6'>
              <div>
                <p className='text-sm uppercase tracking-[0.24em] text-cyan-300'>
                  Dashboard
                </p>
                <h1 className='mt-4 text-4xl font-semibold'>
                  Welcome back{userEmail ? `, ${userEmail}` : ''}.
                </h1>
              </div>
              <div className='grid gap-6 md:grid-cols-2'>
                <article className='rounded-3xl bg-slate-950/80 p-6 border border-slate-800'>
                  <h2 className='text-xl font-semibold text-white'>
                    Your spending summary
                  </h2>
                  <p className='mt-3 text-slate-400'>
                    No expenses yet? Add your first transaction to see budgets
                    and trends.
                  </p>
                </article>
                <article className='rounded-3xl bg-slate-950/80 p-6 border border-slate-800'>
                  <h2 className='text-xl font-semibold text-white'>
                    Budget insights
                  </h2>
                  <p className='mt-3 text-slate-400'>
                    Track monthly limits and compare actual expenditure to
                    targets.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
