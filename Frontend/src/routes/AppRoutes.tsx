import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from '../features/auth/ProtectedRoute';
import PublicOnlyRoute from '../features/auth/PublicOnlyRoute';
import Loader from '../components/ui/Loader';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Expenses = lazy(() => import('../pages/Expenses'));
const Reports = lazy(() => import('../pages/Reports'));
const Profile = lazy(() => import('../pages/Profile'));
const NotFound = lazy(() => import('../pages/NotFound'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />

        <Route element={<PublicOnlyRoute />}>
          <Route path='/login' element={<Login />} />

          <Route path='/signup' element={<Signup />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />

          <Route path='/expenses' element={<Expenses />} />

          <Route path='/reports' element={<Reports />} />

          <Route path='/profile' element={<Profile />} />
        </Route>

        {/* 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
