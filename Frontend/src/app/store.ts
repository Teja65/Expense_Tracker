import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';

import expenseReducer from '../features/expenses/expenseSlice';

import notificationReducer from '../features/notifications/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,

    expenses: expenseReducer,

    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

