import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ isLoggedIn, children, login = "/login" }: any) => {

  if (!isLoggedIn) {
    return <Navigate to={login} replace />;
  }
  return children;

}

export default ProtectedRoutes;