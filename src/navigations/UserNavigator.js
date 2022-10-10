import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {
  Users,
  AllUsers,
  ManageUser,
  ChangePassword,
  AddNewUser,
  PendingApprovals,
} from 'src/screens/admin/users';
import routes from 'src/constants/routes';

const Stack = createStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
        headerLeft: null,
      }}>
      <Stack.Screen name={routes.USERS} component={Users} />
      <Stack.Screen name={routes.ALL_USERS} component={AllUsers} />
      <Stack.Screen name={routes.ADD_NEW_USER} component={AddNewUser} />
      <Stack.Screen name={routes.MANAGE_USER} component={ManageUser} />
      <Stack.Screen name={routes.CHANGE_PASSWORD} component={ChangePassword} />
      <Stack.Screen
        name={routes.PENDING_APPROVALS}
        component={PendingApprovals}
      />
    </Stack.Navigator>
  );
};

export default UserNavigator;
