import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isLoggedIn = async () => {
    try {
      const storageUser = await AsyncStorage.getItem('app_user');
      const storageUserToken = await AsyncStorage.getItem('app_user_token');
      const storageUserRole = await AsyncStorage.getItem('app_user_role');
      setUser(JSON.parse(storageUser));
      setUserToken(storageUserToken);
      setUserRole(JSON.parse(storageUserRole));
    } catch (e) {
      // read key error
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  useEffect(() => {
    user !== null && setIsAuthenticated(true);
  }, [user]);

  useEffect(() => {
    AsyncStorage.setItem('app_user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userToken,
        setUserToken,
        userRole,
        setUserRole,
        isAuthenticated,
        setIsAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
