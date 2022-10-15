import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {Search} from 'src/screens/user/search';
import {Cart, ViewProduct} from 'src/screens/user/product';
import routes from 'src/constants/routes';

const Stack = createStackNavigator();

const UserSearchNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
        headerLeft: null,
      }}>
      <Stack.Screen name={routes.SEARCH} component={Search} />
      <Stack.Screen name={routes.CART} component={Cart} />
      <Stack.Screen name={routes.VIEW_PRODUCT} component={ViewProduct} />
    </Stack.Navigator>
  );
};

export default UserSearchNavigator;
