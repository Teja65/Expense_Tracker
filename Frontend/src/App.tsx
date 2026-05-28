/* eslint-disable @typescript-eslint/no-unused-vars */
import { Provider } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import { store } from './store/store';

import { setUser, clearUser, setInitialized } from './store/authSlice';
import { clearExpenses } from './store/expenseSlice';

import { ThemeProvider } from './types/ThemeContext';

import AppRoutes from './routes/AppRoutes';

import Navbar from './components/layout/Navbar';

import { Toaster } from 'react-hot-toast';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useEffect } from 'react';
import { getProfile, loginUser } from './features/auth/authAPI';
import { auth } from './services/firebase';

const queryClient = new QueryClient();

function AuthListener() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        const user = await getProfile();

        store.dispatch(setUser(user));
      } catch (error) {
        if (!firebaseUser) {
          store.dispatch(clearExpenses());
          store.dispatch(clearUser());
          return;
        }

        try {
          const token = await firebaseUser.getIdToken();
          const user = await loginUser(token);

          store.dispatch(setUser(user));
        } catch {
          store.dispatch(clearExpenses());
          store.dispatch(clearUser());
        }
      } finally {
        store.dispatch(setInitialized());
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthListener />

          <div className='min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100'>
            <Navbar />

            <AppRoutes />
          </div>

          <Toaster
            position='top-right'
            toastOptions={{
              duration: 4000,
            }}
          />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
