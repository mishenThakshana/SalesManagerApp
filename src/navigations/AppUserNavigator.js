import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Orders, Search, Profile} from 'src/screens/user';
import UserProductNavigator from './UserProductNavigator';
import Ionicon from 'react-native-vector-icons/Ionicons';
import routes from 'src/constants/routes';

const BottomTab = createBottomTabNavigator();

const AppUserNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          elevation: 0,
          height: 60,
        },
        tabBarLabelStyle: {fontSize: 8},
      }}>
      <BottomTab.Screen
        name={routes.USER_PRODUCT_NAVIGATOR}
        component={UserProductNavigator}
        options={{
          tabBarActiveTintColor: '#8200d6',
          tabBarIcon: ({color, size}) => (
            <Ionicon name="ios-home-outline" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name={routes.SEARCH}
        component={Search}
        options={{
          tabBarActiveTintColor: '#8200d6',
          tabBarIcon: ({color, size}) => (
            <Ionicon name="ios-search-outline" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name={routes.ORDERS}
        component={Orders}
        options={{
          tabBarActiveTintColor: '#8200d6',
          tabBarIcon: ({color, size}) => (
            <Ionicon name="ios-cube-outline" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name={routes.PROFILE}
        component={Profile}
        options={{
          tabBarActiveTintColor: '#8200d6',
          tabBarIcon: ({color, size}) => (
            <Ionicon name="ios-person-outline" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default AppUserNavigator;