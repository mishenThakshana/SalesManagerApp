import {NavigationContainer} from '@react-navigation/native';
import {useContext} from 'react';
import {AuthContext} from 'src/context/AuthContext';
import AuthNavigator from './AuthNavigator';
import AdminNavigator from './AdminNavigator';
import AppUserNavigator from './AppUserNavigator';

const AppNavigation = () => {
  const {isAuthenticated, userRole} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <AuthNavigator />
      ) : userRole === 1 ? (
        <AdminNavigator />
      ) : (
        <AppUserNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;
