import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className='w-64 border-r border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950'>
      <nav className='space-y-3'>
        <Link
          to='/dashboard'
          className='block rounded-2xl px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        >
          Dashboard
        </Link>

        <Link
          to='/expenses'
          className='block rounded-2xl px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        >
          Expenses
        </Link>

        <Link
          to='/reports'
          className='block rounded-2xl px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        >
          Reports
        </Link>

        <Link
          to='/profile'
          className='block rounded-2xl px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        >
          Profile
        </Link>
      </nav>
    </aside>
  );
}
