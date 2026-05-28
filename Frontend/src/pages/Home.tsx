import { Wallet, PieChart, ShieldCheck } from 'lucide-react';
import { useAppSelector } from '../store/hooks';
import FeatureCard from '../components/home/FeatureCard';
import AppLink from '../components/ui/AppLink';
import { Heading1, LabelText, Paragraph } from '../components/ui/Text';
import en from '../en.json';
import { ROUTES } from '../routes/routes';

const homeText = en.home;

const homeFeatures = [
  {
    icon: Wallet,
    title: homeText.features.expenseTracking.title,
    description: homeText.features.expenseTracking.description,
  },
  {
    icon: PieChart,
    title: homeText.features.analyticsDashboard.title,
    description: homeText.features.analyticsDashboard.description,
  },
  {
    icon: ShieldCheck,
    title: homeText.features.secureAuth.title,
    description: homeText.features.secureAuth.description,
  },
];

export default function Home() {
  const { user, initialized } = useAppSelector((state) => state.auth);

  return (
    <div className='min-h-screen bg-zinc-50 dark:bg-zinc-950'>
      <section className='page-enter mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center'>
        <LabelText className='rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'>
          {homeText.eyebrow}
        </LabelText>

        <Heading1 className='mt-8 max-w-4xl text-5xl font-black leading-tight text-zinc-900 dark:text-white md:text-7xl'>
          {homeText.titleStart}
          <span className='text-emerald-600'>{homeText.titleHighlight}</span>
          {homeText.titleEnd}
        </Heading1>

        <Paragraph className='mt-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300'>
          {homeText.description}
        </Paragraph>

        <div className='mt-10 flex flex-wrap justify-center gap-5'>
          {user ? (
            <AppLink
              to={ROUTES.dashboard}
              className='rounded-2xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700'
            >
              {homeText.actions.dashboard}
            </AppLink>
          ) : (
            <>
              <AppLink
                to={ROUTES.signup}
                className='rounded-2xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700'
              >
                {homeText.actions.getStarted}
              </AppLink>

              {initialized && (
                <AppLink
                  to={ROUTES.login}
                  className='rounded-2xl border border-zinc-300 px-8 py-4 font-semibold transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900'
                >
                  {homeText.actions.login}
                </AppLink>
              )}
            </>
          )}
        </div>

        <div className='mt-20 grid w-full gap-6 md:grid-cols-3'>
          {homeFeatures.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
