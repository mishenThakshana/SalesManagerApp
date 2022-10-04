import {StatusBar} from 'react-native';
import {AuthProvider} from 'src/context/AuthContext';
import AppNavigator from './src/navigations/AppNavigator';

const App = () => {
  return (
    <AuthProvider>
      <StatusBar backgroundColor="#8200d6" barStyle="light-content" />
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
