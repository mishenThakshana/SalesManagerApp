import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {
  Profile,
  UpdateProfile,
  ChangeUserPassword,
} from 'src/screens/user/profile';
import {Cart} from 'src/screens/user/product';
import routes from 'src/constants/routes';

const Stack = createStackNavigator();

const UserProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
        headerLeft: null,
      }}>
      <Stack.Screen name={routes.PROFILE} component={Profile} />
      <Stack.Screen
        name={routes.UPDATE_USER_PROFILE}
        component={UpdateProfile}
      />
      <Stack.Screen
        name={routes.CHANGE_USER_PASSWORD}
        component={ChangeUserPassword}
      />
      <Stack.Screen name={routes.CART} component={Cart} />
    </Stack.Navigator>
  );
};

export default UserProfileNavigator;
