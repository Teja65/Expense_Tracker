import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='page-enter flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 text-center dark:bg-zinc-950'>
      <h1 className='text-8xl font-black text-emerald-600'>404</h1>

      <h2 className='mt-4 text-3xl font-bold'>Page Not Found</h2>

      <p className='mt-3 text-zinc-500'>
        The page you are looking for does not exist.
      </p>

      <Link
        to='/'
        className='mt-8 rounded-2xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700'
      >
        Back Home
      </Link>
    </div>
  );
}
