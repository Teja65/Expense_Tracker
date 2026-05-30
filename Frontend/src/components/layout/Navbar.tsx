import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { clearUser } from '../../store/authSlice';
import { clearExpenses } from '../../store/expenseSlice';
import { logoutUser } from '../../features/auth/authAPI';
import { auth } from '../../services/firebase';

import ThemeToggle from '../ui/ThemeToggle';
import { ROUTES } from '../../routes/routes';
import AppLink from '../ui/AppLink';
import Button from '../ui/Button';
import en from '../../en.json';
import { useTheme } from '../../hooks/useTheme';

const mobileLinks = [
  {
    label: en.layout.sidebar.dashboard,
    to: ROUTES.dashboard,
  },
  {
    label: en.layout.sidebar.expenses,
    to: ROUTES.expenses,
  },
  {
    label: en.layout.sidebar.profile,
    to: ROUTES.profile,
  },
];

export default function Navbar() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { initialized, user } = useAppSelector((state) => state.auth);

  const { theme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuIcon = theme === 'dark' ? '/menu-light.svg' : '/menu-dark.svg';

  const handleLogout = async () => {
    try {
      await logoutUser();
      await signOut(auth);
    } finally {
      dispatch(clearExpenses());
      dispatch(clearUser());

      navigate(ROUTES.login);
    }
  };

  return (
    <header className='border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
        <AppLink to={ROUTES.home} className='text-2xl font-black text-emerald-600'>
          {en.app.brand}
        </AppLink>

        <div className='relative flex items-center gap-4'>
          {initialized && user && (
            <Button
              type='button'
              aria-label={en.layout.sidebar.open}
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              className='inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-300 md:hidden dark:border-zinc-700'
            >
              <img src={menuIcon} alt='' className='h-5 w-5' />
            </Button>
          )}

          <ThemeToggle />

          {!initialized ? null : user ? (
            <Button
              onClick={handleLogout}
              className='rounded-2xl bg-red-500 px-5 py-2 font-semibold text-white'
            >
              {en.layout.nav.logout}
            </Button>
          ) : (
            <AppLink
              to={ROUTES.login}
              className='rounded-2xl bg-emerald-600 px-5 py-2 font-semibold text-white'
            >
              {en.layout.nav.login}
            </AppLink>
          )}

          {initialized && user && isMenuOpen && (
            <div className='absolute right-0 top-14 z-50 w-48 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 md:hidden'>
              {mobileLinks.map((link) => (
                <AppLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className='block rounded-xl px-4 py-3 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800'
                >
                  {link.label}
                </AppLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
