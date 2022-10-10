import {SafeAreaView} from 'react-native';
import {Topbar, LargeBtn} from 'src/components/layout';
import routes from 'src/constants/routes';

const Users = ({navigation}) => {
  return (
    <SafeAreaView>
      <Topbar title="Users" navigation={navigation} />
      <LargeBtn
        handler={() => navigation.navigate(routes.ADD_NEW_USER)}
        label="Add New User"
      />
      <LargeBtn
        handler={() => navigation.navigate(routes.ALL_USERS)}
        label="All Users"
      />
      <LargeBtn
        handler={() => navigation.navigate(routes.PENDING_APPROVALS)}
        label="Pending Approvals"
      />
    </SafeAreaView>
  );
};

export default Users;
