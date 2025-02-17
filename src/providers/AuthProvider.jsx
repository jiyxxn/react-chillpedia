import { useEffect, useState, createContext } from 'react';
import supabase from '../shared/SupabaseClient';

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

  const logout = async () => {
    await supabase.auth.signOut();
    setIsLogin(false);
  };

  return (
    <UserLoginContext.Provider value={{ isLogin, user, logout }}>
      {children}
    </UserLoginContext.Provider>
  );
};

export default AuthProvider;
