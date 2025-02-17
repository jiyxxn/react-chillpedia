import { useEffect, useState, createContext } from 'react';
import supabase from '../shared/supabaseClient';

export const UserLoginContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setIsLogin(true);
        setUser(session.user);
      } else {
        setIsLogin(false);
        setUser(null);
      }
    });
  }, []);

  return (
    <UserLoginContext.Provider value={{ isLogin, user }}>
      {children}
    </UserLoginContext.Provider>
  );
};

export default AuthProvider;
