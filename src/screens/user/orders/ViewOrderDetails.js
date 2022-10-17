import {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {SingleTopbar} from 'src/components/layout';
import {FormInput, FormPrimaryBtn, FormSecondaryBtn} from 'src/components/form';
import {OrderCard} from 'src/components/order';
import {protectedHttp} from 'src/helpers/HttpHelper';
import {format} from 'date-fns';
import routes from 'src/constants/routes';

const ViewOrderDetails = ({route, navigation}) => {
  const {item} = route.params;
  const [orderItems, setOrderItems] = useState([]);
  const [commisionRecord, setCommisionRecord] = useState('');

  const getOrderDetails = () => {
    protectedHttp.get(`/order/${item.id}`).then(res => {
      setOrderItems(res.data);
    });
  };

  const getCommisionRecord = () => {
    protectedHttp
      .get(`/get-commision-record-of-the-order/${item.id}`)
      .then(res => {
        setCommisionRecord(res.data);
      });
  };

  useEffect(() => {
    getOrderDetails();
    getCommisionRecord();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <SingleTopbar title={`Order #${item.id}`} navigation={navigation} />
      <ScrollView>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Text style={{color: '#A9A9A9', fontSize: 16, fontWeight: 'bold'}}>
            Order placed: {item && format(item.created, 'yyyy-MMMM-dd')}
          </Text>
          {commisionRecord && (
            <Text
              style={{
                color: '#8200d6',
                fontSize: 16,
                fontWeight: 'bold',
                marginVertical: 10,
              }}>
              Commision: Rs.{commisionRecord.price}
              {'  '}
              {commisionRecord.status === 0 ? (
                <Text style={{color: 'red'}}>Unpaid</Text>
              ) : (
                <Text style={{color: 'green'}}>Paid</Text>
              )}
            </Text>
          )}
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
      <View style={{alignItems: 'center', backgroundColor: '#fff'}}>
        <View>
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
              fontSize: 18,
              marginVertical: 10,
            }}>
            Total: {item ? item.price : '0'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewOrderDetails;
