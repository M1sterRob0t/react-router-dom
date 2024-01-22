import { useContext } from 'react';
import { AuthContext } from '../../hocs/AuthProvider';

function Profile() {
  const auth =useContext(AuthContext);

  return (
    <div className='profile'>
      <h1>Hello, {auth?.user.name}</h1>
    </div>
  );
}

export default Profile;
