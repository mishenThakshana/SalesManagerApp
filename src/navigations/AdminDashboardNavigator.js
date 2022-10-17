import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {Dashboard} from 'src/screens/admin';
import {AllProducts} from 'src/screens/admin/product';
import {AllUsers} from 'src/screens/admin/users';
import {AllOrders} from 'src/screens/admin/orders';
import routes from 'src/constants/routes';

const Stack = createStackNavigator();

const AdminDashboardNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
        headerLeft: null,
      }}>
      <Stack.Screen name={routes.DASHBOARD} component={Dashboard} />
      <Stack.Screen name={routes.ALL_PRODUCTS} component={AllProducts} />
      <Stack.Screen name={routes.ALL_USERS} component={AllUsers} />
      <Stack.Screen name={routes.ALL_ORDERS} component={AllOrders} />
    </Stack.Navigator>
  );
};

export default AdminDashboardNavigator;
