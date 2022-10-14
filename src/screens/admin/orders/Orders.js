import {SafeAreaView} from 'react-native';
import {Topbar, LargeBtn} from 'src/components/layout';
import routes from 'src/constants/routes';

const Orders = ({navigation}) => {
  return (
    <SafeAreaView>
      <Topbar title="Orders" navigation={navigation} />
      <LargeBtn
        handler={() => navigation.navigate(routes.ALL_ORDERS)}
        label="All Orders"
      />
      <LargeBtn
        handler={() => navigation.navigate(routes.PENDING_ORDERS)}
        label="Pending Orders"
      />
    </SafeAreaView>
  );
};

export default Orders;
