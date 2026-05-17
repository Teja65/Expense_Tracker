export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export type Notification = {
  id: string;

  title: string;

  message: string;

  type: NotificationType;

  createdAt: string;

  read: boolean;
};

export type NotificationState = {
  notifications: Notification[];
};
