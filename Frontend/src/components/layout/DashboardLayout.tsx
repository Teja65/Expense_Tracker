import { useEffect, type ReactNode } from 'react';

import Sidebar from './Sidebar';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchExpenses } from '../../store/expenseSlice';

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchExpenses());
    }
  }, [dispatch, user]);

  return (
    <div className='flex min-h-screen'>
      <Sidebar />

      <main className='page-enter flex-1 bg-zinc-50 p-8 dark:bg-zinc-950'>
        {children}
      </main>
    </div>
  );
}
