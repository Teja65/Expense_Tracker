import { ROUTES } from '../../routes/routes';
import AppLink from '../ui/AppLink';
import en from '../../en.json';

const sidebarText = en.layout.sidebar;

const links = [
  {
    label: sidebarText.dashboard,
    to: ROUTES.dashboard,
  },
  {
    label: sidebarText.expenses,
    to: ROUTES.expenses,
  },
  {
    label: sidebarText.profile,
    to: ROUTES.profile,
  },
];

export default function Sidebar() {
  return (
    <aside className='hidden w-64 border-r border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 md:block'>
      <nav className='space-y-3'>
        {links.map((link) => (
          <AppLink
            key={link.to}
            to={link.to}
            className='block rounded-2xl px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          >
            {link.label}
          </AppLink>
        ))}
      </nav>
    </aside>
  );
}
