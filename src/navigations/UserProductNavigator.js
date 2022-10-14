import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {Home, ViewProduct, Cart} from 'src/screens/user/product';
import routes from 'src/constants/routes';

const Stack = createStackNavigator();

const UserProductNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
        headerLeft: null,
      }}>
      <Stack.Screen name={routes.HOME} component={Home} />
      <Stack.Screen name={routes.VIEW_PRODUCT} component={ViewProduct} />
      <Stack.Screen name={routes.CART} component={Cart} />
    </Stack.Navigator>
  );
};

export default UserProductNavigator;
