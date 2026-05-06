import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import DashboardPage from '../pages/DashboardPage';
import PrivacySettings from '../features/privacy/PrivacySettings';
import ProtectedRoute from '../features/auth/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/privacy'
        element={
          <ProtectedRoute>
            <div className='min-h-screen bg-slate-950 text-slate-100 py-8'>
              <PrivacySettings />
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
