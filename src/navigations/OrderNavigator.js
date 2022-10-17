import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {
  Orders,
  AllOrders,
  ViewOrder,
  PendingOrders,
  ViewCommisionRecord,
} from 'src/screens/admin/orders';
import routes from 'src/constants/routes';

const Stack = createStackNavigator();

const OrderNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
        headerLeft: null,
      }}>
      <Stack.Screen name={routes.ORDERS} component={Orders} />
      <Stack.Screen name={routes.ALL_ORDERS} component={AllOrders} />
      <Stack.Screen name={routes.VIEW_ORDER} component={ViewOrder} />
      <Stack.Screen
        name={routes.VIEW_COMMISION_RECORD}
        component={ViewCommisionRecord}
      />
      <Stack.Screen name={routes.PENDING_ORDERS} component={PendingOrders} />
    </Stack.Navigator>
  );
};

export default OrderNavigator;
