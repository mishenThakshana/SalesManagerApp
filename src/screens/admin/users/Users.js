import {SafeAreaView} from 'react-native';
import {Topbar, LargeBtn} from 'src/components/layout';
import routes from 'src/constants/routes';

const Users = ({navigation}) => {
  return (
    <SafeAreaView>
      <Topbar title="Users" navigation={navigation} />
      <LargeBtn
        handler={() => navigation.navigate(routes.ALL_USERS)}
        label="All Users"
      />
    </SafeAreaView>
  );
};

export default Users;
