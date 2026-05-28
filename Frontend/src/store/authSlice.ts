import { createSlice } from '@reduxjs/toolkit';

import type { AuthState, User } from '../types/auth';

const initialState: AuthState = {
  user: null,

  loading: false,

  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    setUser: (
      state,
      action: {
        payload: User;
      },
    ) => {
      state.user = action.payload;

      state.initialized = true;
    },

    clearUser: (state) => {
      state.user = null;

      state.initialized = true;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setInitialized: (state) => {
      state.initialized = true;
    },
  },
});

export const { setUser, clearUser, setLoading, setInitialized } =
  authSlice.actions;

export default authSlice.reducer;
