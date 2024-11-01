import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: 1,
    name: 'Jasper Meersschaut',
    email: 'jasper.meersschaut@example.com',
    sex: 'male',
    birthdate: '2005-01-16',
    length: 177,
    weight: 73,
  });

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};