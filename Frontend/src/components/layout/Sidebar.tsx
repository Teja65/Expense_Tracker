import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className='w-64 border-r border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950'>
      <nav className='space-y-3'>
        <Link
          to='/dashboard'
          className='block rounded-2xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800'
        >
          Dashboard
        </Link>

        <Link
          to='/expenses'
          className='block rounded-2xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800'
        >
          Expenses
        </Link>

        <Link
          to='/reports'
          className='block rounded-2xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800'
        >
          Reports
        </Link>

        <Link
          to='/profile'
          className='block rounded-2xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800'
        >
          Profile
        </Link>
      </nav>
    </aside>
  );
}
