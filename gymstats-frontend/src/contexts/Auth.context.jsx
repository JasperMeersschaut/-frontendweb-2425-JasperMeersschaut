import {
  createContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import * as api from '../api/index.js';

export const AuthContext = createContext();
export const JWT_TOKEN_KEY = 'jwtToken';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));

  const { trigger: doLogin, error: loginError, isMutating: loginLoading } =
    useSWRMutation('sessions', api.post);

  const { data: user, error: userError, loading: userLoading } = useSWR(
    token ? 'users/me' : null,
    api.get,
  );

  const login = useCallback(
    async (email, password) => {
      try {
        const { token } = await doLogin({ email, password });
        setToken(token);
        localStorage.setItem(JWT_TOKEN_KEY, token);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doLogin],
  );
  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem(JWT_TOKEN_KEY);
  }, []);

  const value = useMemo(
    () => ({
      user,
      error: loginError || userError,
      loading: loginLoading || userLoading,
      isAuthed: Boolean(token),
      ready: !userLoading,
      login,
      logout,
    }),
    [token, user, loginError, loginLoading, userError, userLoading, login,logout],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};