import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { store } from './app/store';
import { setUser, clearUser } from './features/auth/authSlice';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/layout/Navbar';

const queryClient = new QueryClient();

function AuthListener() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        store.dispatch(
          setUser({
            user: {
              uid: user.uid,
              email: user.email ?? '',
              displayName: user.displayName ?? '',
              photoURL: user.photoURL ?? '',
            },
            token,
          }),
        );
      } else {
        store.dispatch(clearUser());
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
        <AuthListener />
        <BrowserRouter>
          <div className='min-h-screen bg-slate-950 text-slate-100'>
            <Navbar />
            <AppRoutes />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
