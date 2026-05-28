import DashboardLayout from '../components/layout/DashboardLayout';
import { Heading1, Paragraph } from '../components/ui/Text';

import { useAppSelector } from '../store/hooks';
import { UserRound } from 'lucide-react';

export default function Profile() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <DashboardLayout>
      <div className='animate-rise mx-auto max-w-2xl rounded-3xl bg-white p-10 shadow-xl dark:bg-zinc-900'>
        <div className='flex flex-col items-center text-center'>
          <div className='rotate-[-3deg] rounded-[2rem] bg-white p-3 shadow-2xl ring-1 ring-zinc-200 transition duration-300 hover:rotate-0 hover:scale-105 dark:bg-zinc-800 dark:ring-zinc-700'>
            {user?.picture ? (
              <img
                src={user.picture}
                alt='Profile'
                className='h-32 w-32 rounded-[1.5rem] object-cover'
              />
            ) : (
              <div className='flex h-32 w-32 items-center justify-center rounded-[1.5rem] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200'>
                <UserRound size={58} />
              </div>
            )}
          </div>

          <Heading1 className='mt-6 text-4xl font-black'>{user?.name}</Heading1>

          <Paragraph className='mt-2 text-zinc-500'>{user?.email}</Paragraph>
        </div>
      </div>
    </DashboardLayout>
  );
}
