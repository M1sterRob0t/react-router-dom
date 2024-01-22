import { createContext, useState } from 'react';
import { TUser, TValue } from '../types';


let defaultUser: TUser = {
  name: null,
  email: null,
  password: null,
}

export const AuthContext = createContext<TValue | null>(null);

interface IwithAuthContext {
  children: JSX.Element;
}

function AuthProvider({children}: IwithAuthContext) {
  const [user, setUser] = useState<TUser>(defaultUser);

  function signIn(name: string, email: string, password: string) {
    setUser({name, email, password});
  }

  function signOut() {
    setUser({email: null, password: null, name: null});
  }

  const value: TValue = {user, signIn, signOut};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
