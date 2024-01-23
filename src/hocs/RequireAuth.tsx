import { Navigate, useLocation } from 'react-router-dom';
import { AppRoute } from '../constants';
import { useAuth } from '../hooks/useAuth';

interface IRequireAuth {
  children: JSX.Element;
}

function RequireAuth({children}: IRequireAuth) {
  const location = useLocation();
  const {user} = useAuth();

  if (user.name) {
    return <Navigate to={'/' + AppRoute.Login} state={location.pathname}/>
  }

  return children;
}

export default RequireAuth;
