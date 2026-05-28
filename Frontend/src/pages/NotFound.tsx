import AppLink from '../components/ui/AppLink';
import { Heading1, Heading2, Paragraph } from '../components/ui/Text';
import { ROUTES } from '../routes/routes';

export default function NotFound() {
  return (
    <div className='page-enter flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 text-center dark:bg-zinc-950'>
      <Heading1 className='text-8xl font-black text-emerald-600'>404</Heading1>

      <Heading2 className='mt-4 text-3xl font-bold'>Page Not Found</Heading2>

      <Paragraph className='mt-3 text-zinc-500'>
        The page you are looking for does not exist.
      </Paragraph>

      <AppLink
        to={ROUTES.home}
        className='mt-8 rounded-2xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700'
      >
        Back Home
      </AppLink>
    </div>
  );
}
