import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {Orders, ViewOrderDetails} from 'src/screens/user/orders';
import {Cart} from 'src/screens/user/product';
import routes from 'src/constants/routes';

const Stack = createStackNavigator();

const UserOrderNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
        headerLeft: null,
      }}>
      <Stack.Screen name={routes.USER_ORDERS} component={Orders} />
      <Stack.Screen name={routes.CART} component={Cart} />
      <Stack.Screen
        name={routes.VIEW_ORDER_DETAILS}
        component={ViewOrderDetails}
      />
    </Stack.Navigator>
  );
};

export default UserOrderNavigator;
