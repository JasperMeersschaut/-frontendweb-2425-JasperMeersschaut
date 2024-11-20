import { createContext, useState } from 'react';
import useSWR from 'swr';
import { getById } from '../api/index.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: opgevraagdeUser, error } = useSWR('users/1', getById);

  const [user, setUser] = useState(null);

  if (error) return <div>Failed to load user</div>;
  if (!opgevraagdeUser) return <div>Loading...</div>;

  if (user === null) {
    setUser({
      userId: opgevraagdeUser.id,
      name: opgevraagdeUser.name,
      email: opgevraagdeUser.email,
      sex: opgevraagdeUser.sec,
      birthdate: opgevraagdeUser.birthdate,
      length: opgevraagdeUser.length,
      weight: opgevraagdeUser.weight,
    });
  }

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