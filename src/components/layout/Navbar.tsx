import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clearUser } from '../../features/auth/authSlice';
import { logout } from '../../features/auth/authAPI';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = Boolean(useAppSelector((state) => state.auth.token));
  const user = useAppSelector((state) => state.auth.user);

  // Debug authentication state
  console.log('Navbar auth state:', {
    isAuthenticated,
    user,
    token: !!useAppSelector((state) => state.auth.token),
  });

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

  // Alternative approach: define authenticated and unauthenticated links separately
  const authenticatedLinks = [{ label: 'Home', path: '/' }];
  const unauthenticatedLinks = [
    { label: 'Home', path: '/' },
    { label: 'Login', path: '/login' },
    { label: 'Signup', path: '/signup' },
  ];

  const displayLinks = isAuthenticated
    ? authenticatedLinks
    : unauthenticatedLinks;

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
            {displayLinks.map((link) => (
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
              <>
                <Link
                  to='/dashboard'
                  onClick={() => setIsOpen(false)}
                  className='rounded-full border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-medium text-slate-100 transition duration-200 hover:border-cyan-400 hover:text-cyan-200 md:ml-2 md:px-3 md:py-2'
                >
                  Dashboard
                </Link>

                {/* User Profile Section */}
                <div className='mt-4 flex items-center gap-3 border-t border-slate-800 pt-4 md:mt-0 md:border-t-0 md:pt-0 md:ml-4'>
                  {/* User Icon */}
                  <div className='flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='h-4 w-4 text-slate-300'
                    >
                      <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
                      <circle cx='12' cy='7' r='4' />
                    </svg>
                  </div>

                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-slate-200'>
                      Welcome back,{' '}
                      {user?.displayName ||
                        user?.email?.split('@')[0] ||
                        'User'}
                      !
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className='rounded-full border border-red-700 bg-red-900/20 px-3 py-1 text-xs font-medium text-red-300 transition duration-200 hover:border-red-600 hover:bg-red-900/40 hover:text-red-200'
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
}
