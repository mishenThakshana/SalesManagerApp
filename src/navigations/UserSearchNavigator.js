import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {Search} from 'src/screens/user/search';
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
    </Stack.Navigator>
  );
};

export default UserSearchNavigator;
