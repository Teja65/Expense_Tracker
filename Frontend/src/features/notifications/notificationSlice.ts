import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export type Notification = {
  id: string;

  title: string;

  message: string;

  type: NotificationType;

  createdAt: string;

  read: boolean;
};

type NotificationState = {
  notifications: Notification[];
};

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',

  initialState,

  reducers: {
    addNotification: {
      reducer: (state, action: PayloadAction<Notification>) => {
        state.notifications.unshift(action.payload);
      },

      prepare: ({
        title,
        message,
        type,
      }: {
        title: string;

        message: string;

        type: NotificationType;
      }) => ({
        payload: {
          id: nanoid(),

          title,

          message,

          type,

          createdAt: new Date().toISOString(),

          read: false,
        },
      }),
    },

    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload,
      );

      if (notification) {
        notification.read = true;
      }
    },

    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload,
      );
    },

    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  addNotification,
  markAsRead,
  removeNotification,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
