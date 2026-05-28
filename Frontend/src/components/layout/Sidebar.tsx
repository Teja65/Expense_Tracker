import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

export default function Sidebar() {
  return (
    <aside className='w-64 border-r border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950'>
      <nav className='space-y-3'>
        <Link
          to={ROUTES.dashboard}
          className='block rounded-2xl px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        >
          Dashboard
        </Link>

        <Link
          to={ROUTES.expenses}
          className='block rounded-2xl px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        >
          Expenses
        </Link>

        <Link
          to={ROUTES.reports}
          className='block rounded-2xl px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        >
          Reports
        </Link>

        <Link
          to={ROUTES.profile}
          className='block rounded-2xl px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        >
          Profile
        </Link>
      </nav>
    </aside>
  );
}
