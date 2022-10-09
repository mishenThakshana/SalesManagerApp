import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dashboard} from 'src/screens/admin';
import {ModifiedDrawer} from 'src/components/layout';
import ProductNavigator from './ProductNavigator';
import UserNavigator from './UserNavigator';
import routes from 'src/constants/routes';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const AdminNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <ModifiedDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {marginLeft: -25, fontSize: 15},
      }}>
      <Drawer.Screen
        name={routes.DASHBOARD}
        component={Dashboard}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="grid-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={routes.PRODUCT_NAVIGATOR}
        component={ProductNavigator}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="pricetags-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={routes.USER_NAVIGATOR}
        component={UserNavigator}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="ios-people-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AdminNavigator;
