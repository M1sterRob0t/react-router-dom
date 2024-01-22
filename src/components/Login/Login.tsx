import { useAuth } from '../../hooks/useAuth';
import './Login.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../constants';

function Login() {
  const {user, signIn} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state || AppRoute.Root;

  if (user.name) {
    return <Navigate to={fromPage}/>
  }

  function onSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const form = evt.currentTarget;
    const formData = new FormData(form);

    const name = formData.get('username') as string;
    const email= formData.get('email')  as string;
    const password = formData.get('password')  as string;

    signIn(name, email, password);
    navigate(fromPage, {replace: true});
  }

  return (
    <form className='login' onSubmit={onSubmit}>
      <label>Name: <input type='text' name='username' required/></label>
      <label>Email: <input type='email' name='email' required/></label>
      <label>Password: <input type='password' name='password' required/></label>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default Login;
