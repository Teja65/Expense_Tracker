import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Login', path: '/login' },
  { label: 'Signup', path: '/signup' },
];

export default function Navbar() {
  const location = useLocation();
  const isAuthenticated = Boolean(useAppSelector((state) => state.auth.token));

  return (
    <header className='border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl'>
      <div className='mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 sm:px-8'>
        <Link
          to='/'
          className='text-lg font-semibold tracking-tight text-white'
        >
          ExpenseTracker
        </Link>

        <nav className='flex flex-wrap items-center gap-4'>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                location.pathname === link.path
                  ? 'bg-slate-800 text-cyan-300'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <Link
              to='/dashboard'
              className='rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-cyan-400 hover:text-cyan-200'
            >
              Dashboard
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
