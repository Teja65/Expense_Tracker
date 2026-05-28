import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';

import Loader from '../../components/ui/Loader';
import { ROUTES } from '../../routes/routes';

export default function ProtectedRoute() {
  const { user, initialized } = useAppSelector((state) => state.auth);

  if (!initialized) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return <Outlet />;
}
