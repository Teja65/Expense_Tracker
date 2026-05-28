import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from '../features/auth/ProtectedRoute';
import PublicOnlyRoute from '../features/auth/PublicOnlyRoute';
import Loader from '../components/ui/Loader';
import { ROUTES } from './routes';

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
        <Route path={ROUTES.home} element={<Home />} />

        <Route element={<PublicOnlyRoute />}>
          <Route path={ROUTES.login} element={<Login />} />

          <Route path={ROUTES.signup} element={<Signup />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.dashboard} element={<Dashboard />} />

          <Route path={ROUTES.expenses} element={<Expenses />} />

          <Route path={ROUTES.reports} element={<Reports />} />

          <Route path={ROUTES.profile} element={<Profile />} />
        </Route>

        {/* 404 */}
        <Route path={ROUTES.notFound} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
