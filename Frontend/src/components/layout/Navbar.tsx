import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { clearUser } from '../../store/authSlice';
import { clearExpenses } from '../../store/expenseSlice';
import { logoutUser } from '../../features/auth/authAPI';
import { auth } from '../../services/firebase';

import ThemeToggle from '../ui/ThemeToggle';
import { ROUTES } from '../../routes/routes';

export default function Navbar() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { initialized, user } = useAppSelector((state) => state.auth);

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
        <Link to={ROUTES.home} className='text-2xl font-black text-emerald-600'>
          ExpenseTracker
        </Link>

        <div className='flex items-center gap-4'>
          <ThemeToggle />

          {!initialized ? null : user ? (
            <button
              onClick={handleLogout}
              className='rounded-2xl bg-red-500 px-5 py-2 font-semibold text-white'
            >
              Logout
            </button>
          ) : (
            <Link
              to={ROUTES.login}
              className='rounded-2xl bg-emerald-600 px-5 py-2 font-semibold text-white'
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
