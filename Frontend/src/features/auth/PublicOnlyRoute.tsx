import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';

import Loader from '../../components/ui/Loader';

export default function PublicOnlyRoute() {
  const { user, initialized } = useAppSelector((state) => state.auth);

  if (!initialized) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to='/dashboard' replace />;
  }

  return <Outlet />;
}
