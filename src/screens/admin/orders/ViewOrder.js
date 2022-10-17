import {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {SingleTopbar} from 'src/components/layout';
import {
  FormInput,
  FormPrimaryBtn,
  FormSecondaryBtn,
  FormLink,
} from 'src/components/form';
import {OrderCard} from 'src/components/order';
import {protectedHttp} from 'src/helpers/HttpHelper';
import {format} from 'date-fns';
import routes from 'src/constants/routes';

const ViewOrder = ({route, navigation}) => {
  const {id} = route.params;
  const [order, setOrder] = useState('');
  const [orderTotal, setOrderTotal] = useState('0');
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusLoader, setStatusLoader] = useState(false);

  const getOrderDetails = () => {
    protectedHttp.get(`/order/${id}`).then(res => {
      setOrderItems(res.data);
    });
  };

  const getOrder = () => {
    protectedHttp.get(`/get-order/${id}`).then(res => {
      setOrder(res.data);
      setOrderTotal(res.data.price);
    });
  };

  const orderTotalUpdateHandler = () => {
    setLoading(true);
    if (orderTotal === '') {
      alert('Total must not be empty');
      setLoading(false);
    } else {
      protectedHttp
        .post(`/update-order-total`, {id, orderTotal})
        .then(res => {
          setOrder(res.data);
          alert('Total has been updated');
        })
        .finally(() => setLoading(false));
    }
  };

  const orderApprovalHandler = status => {
    setStatusLoader(true);
    protectedHttp
      .post(`/update-order-status`, {id, status})
      .then(res => {
        setOrder(res.data);
        alert('Order status has been updated');
      })
      .finally(() => setStatusLoader(false));
  };

  useEffect(() => {
    getOrder();
    getOrderDetails();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <SingleTopbar
        title={`Order #${id}`}
        navigation={navigation}
        customBack={() => navigation.navigate(routes.ORDERS)}
      />
      <ScrollView>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Text style={{color: '#A9A9A9', fontSize: 16, fontWeight: 'bold'}}>
            Order placed: {order && format(order.created, 'yyyy-MMMM-dd')}
          </Text>
        </View>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <FormLink
            handler={() =>
              navigation.navigate(routes.VIEW_COMMISION_RECORD, {id})
            }
            mainText="Click to view the"
            subText="commision record"
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 10,
            marginHorizontal: 10,
          }}>
          <Text style={{color: '#000', fontSize: 24, fontWeight: 'bold'}}>
            Ordered Items:
          </Text>

          <View style={{alignItems: 'center', width: '90%'}}>
            {orderItems.length === 0 && (
              <ActivityIndicator color="#8200d6" size={22} />
            )}
            {orderItems.map(item => (
              <OrderCard key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={{alignItems: 'center', backgroundColor: '#F9F6EE'}}>
        <View>
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
              fontSize: 18,
              marginVertical: 10,
            }}>
            Total: {order ? order.price : '0'}
          </Text>
        </View>
        <View>
          <FormInput
            handler={setOrderTotal}
            placeholder="New total"
            value={orderTotal}
            type="number"
          />
        </View>
        <FormSecondaryBtn
          loading={loading}
          handler={orderTotalUpdateHandler}
          icon="ios-create-outline"
          label="Adjust Total"
        />
        {order.status === 0 ? (
          <FormPrimaryBtn
            loading={statusLoader}
            handler={() => orderApprovalHandler(1)}
            icon="ios-shield-checkmark-outline"
            label="Approve Order"
          />
        ) : (
          <FormPrimaryBtn
            loading={statusLoader}
            handler={() => orderApprovalHandler(0)}
            icon="ios-remove-circle-outline"
            label="Unapprove Order"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ViewOrder;
