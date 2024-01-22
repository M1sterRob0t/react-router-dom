import { createContext, useState } from 'react';
import { TAuthInfo, TValue } from '../types';


let defaulTAuthInfo: TAuthInfo = {
  name: null,
  email: null,
  password: null,
}

export const AuthContext = createContext<TValue | null>(null);

interface IwithAuthContext {
  children: JSX.Element;
}

function AuthProvider({children}: IwithAuthContext) {
  const [user, seTAuthInfo] = useState<TAuthInfo>(defaulTAuthInfo);

  function signIn(name: string, email: string, password: string) {
    seTAuthInfo({name, email, password});
  }

  function signOut() {
    seTAuthInfo({email: null, password: null, name: null});
  }

  const value: TValue = {user, signIn, signOut};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
