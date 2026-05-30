import {
  Bell,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
} from 'lucide-react';

import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';

import {
  clearNotifications,
  markAsRead,
  removeNotification,
} from '../../store/notificationSlice';
import Button from '../../components/ui/Button';
import { Heading2, Heading3, Paragraph } from '../../components/ui/Text';
import en from '../../en.json';

const notificationText = en.notifications;

export default function NotificationBell() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const notifications = useAppSelector(
    (state) => state.notifications.notifications,
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className='text-green-500' size={18} />;

      case 'error':
        return <AlertCircle className='text-red-500' size={18} />;

      case 'warning':
        return <AlertTriangle className='text-yellow-500' size={18} />;

      default:
        return <Info className='text-emerald-500' size={18} />;
    }
  };

  return (
    <div className='relative'>
      <Button
        aria-label={notificationText.open}
        onClick={() => setOpen(!open)}
        className='relative rounded-full border border-zinc-200 bg-white p-2 transition hover:scale-105 dark:border-zinc-700 dark:bg-zinc-900'
      >
        <Bell size={20} />

        {unreadCount > 0 && (
          <span className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white'>
            {unreadCount}
          </span>
        )}
      </Button>

      {open && (
        <div className='absolute right-0 top-14 z-50 w-96 rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950'>
          <div className='flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-800'>
            <Heading2 className='text-lg font-black'>
              {notificationText.title}
            </Heading2>

            {notifications.length > 0 && (
              <Button
                onClick={() => dispatch(clearNotifications())}
                className='text-sm font-medium text-red-500 transition hover:text-red-600'
              >
                {notificationText.clearAll}
              </Button>
            )}
          </div>

          <div className='max-h-[400px] overflow-y-auto'>
            {notifications.length === 0 ? (
              <Paragraph className='p-8 text-center text-sm text-zinc-500'>
                {notificationText.empty}
              </Paragraph>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border-b border-zinc-100 p-4 transition dark:border-zinc-800 ${
                    !notification.read ? 'bg-emerald-50 dark:bg-emerald-950/20' : ''
                  }`}
                >
                  <div className='flex items-start justify-between gap-3'>
                    <div className='flex gap-3'>
                      {getIcon(notification.type)}

                      <div>
                        <Heading3 className='font-semibold'>
                          {notification.title}
                        </Heading3>

                        <Paragraph className='mt-1 text-sm text-zinc-500 dark:text-zinc-400'>
                          {notification.message}
                        </Paragraph>

                        <Paragraph className='mt-2 text-xs text-zinc-400'>
                          {new Date(notification.createdAt).toLocaleString()}
                        </Paragraph>
                      </div>
                    </div>

                    <div className='flex items-center gap-2'>
                      {!notification.read && (
                        <Button
                          onClick={() => dispatch(markAsRead(notification.id))}
                          className='text-xs font-medium text-emerald-600 transition hover:text-emerald-700'
                        >
                          {notificationText.read}
                        </Button>
                      )}

                      <Button
                        aria-label={notificationText.remove}
                        onClick={() =>
                          dispatch(removeNotification(notification.id))
                        }
                        className='text-red-500 transition hover:text-red-600'
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
