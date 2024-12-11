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

  const { trigger: doLogin, error: loginError, isMutating: loginLoading, 
  } = useSWRMutation('sessions', api.post);

  const {trigger: doRegister, error: registerError, isMutating: registerLoading,  
  } = useSWRMutation('users', api.post);

  const setSession = useCallback(
    (token) => {
      setToken(token);
      localStorage.setItem(JWT_TOKEN_KEY, token);
    },
    [],
  );

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
    [doLogin,setSession],
  );

  const register = useCallback(
    async (data) => {
      try {
        const { token } = await doRegister(data);
        setSession(token);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doRegister, setSession],
  );

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem(JWT_TOKEN_KEY);
  }, []);

  const value = useMemo(
    () => ({
      user,
      error: loginError || userError ||registerError,
      loading: loginLoading || userLoading ||registerLoading,
      isAuthed: Boolean(token),
      ready: !userLoading,
      login,
      logout,
      register,
    }),
    [token, user, loginError, loginLoading, userError, userLoading,registerError, registerLoading 
      , login,logout,register],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};