import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clearUser } from '../../features/auth/authSlice';
import { logout } from '../../features/auth/authAPI';

const authenticatedNavLinks = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
];

const unauthenticatedNavLinks = [
  { label: 'Home', path: '/' },
  { label: 'Login', path: '/login' },
  { label: 'Signup', path: '/signup' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = Boolean(useAppSelector((state) => state.auth.token));
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearUser());
      navigate('/');
      setIsOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navLinks = isAuthenticated
    ? authenticatedNavLinks
    : unauthenticatedNavLinks;

  return (
    <header className='relative border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl'>
      <div className='mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 sm:px-8'>
        <Link
          to='/'
          className='text-lg font-semibold tracking-tight text-white'
        >
          ExpenseTracker
        </Link>

        <button
          type='button'
          className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-100 transition hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950 md:hidden'
          aria-label='Toggle navigation'
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className='sr-only'>Toggle navigation</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='h-6 w-6'
          >
            {isOpen ? (
              <path d='M18 6L6 18M6 6l12 12' />
            ) : (
              <path d='M4 7h16M4 12h16M4 17h16' />
            )}
          </svg>
        </button>

        <nav
          className={`${
            isOpen ? 'block' : 'hidden'
          } absolute left-4 right-4 top-full mt-2 z-20 rounded-3xl border border-slate-800 bg-slate-950/95 p-4 shadow-2xl shadow-slate-950/30 md:static md:top-auto md:left-auto md:right-auto md:mt-0 md:block md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-end md:gap-1'>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`rounded-full px-4 py-3 text-sm font-medium tracking-tight transition duration-200 md:px-3 md:py-2 ${
                  location.pathname === link.path
                    ? 'bg-slate-800 text-cyan-300 md:bg-transparent md:text-cyan-300'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className='flex items-center gap-2 md:ml-2'>
                {/* User Profile */}
                <div className='flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-2'>
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt='Profile'
                      className='h-6 w-6 rounded-full'
                    />
                  ) : (
                    <svg
                      className='h-6 w-6 text-slate-400'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  )}
                  <span className='text-sm font-medium text-slate-200'>
                    {user?.displayName || user?.email?.split('@')[0] || 'User'}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className='rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-300 transition duration-200 hover:border-red-400 hover:text-red-300'
                >
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
}
