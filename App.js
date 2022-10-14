import {StatusBar} from 'react-native';
import {AuthProvider} from 'src/context/AuthContext';
import {CartProvider} from 'src/context/CartContext';
import AppNavigator from './src/navigations/AppNavigator';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <StatusBar backgroundColor="#8200d6" barStyle="light-content" />
        <AppNavigator />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
