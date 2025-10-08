import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const useAuth = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
