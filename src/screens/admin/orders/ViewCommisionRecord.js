import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, Text, View} from 'react-native';
import {SingleTopbar} from 'src/components/layout';
import {
  FormInputWithLink,
  FormPrimaryBtn,
  FormRadio,
} from 'src/components/form';
import {protectedHttp} from 'src/helpers/HttpHelper';

const ViewCommisionRecord = ({route, navigation}) => {
  const {id} = route.params;
  const isFocused = useIsFocused();
  const [user, setUser] = useState('');
  const [commision, setCommision] = useState('');
  const [orderTotal, setOrderTotal] = useState('0');
  const [commisionRecord, setCommisionRecord] = useState('');
  const [paidStatus, setPaidStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitialising] = useState(true);

  const getCommisionRecord = () => {
    protectedHttp.get(`/get-commision-record-of-the-order/${id}`).then(res => {
      setCommisionRecord(res.data);
      setInitialising(false);
    });
  };

  const getOrder = () => {
    protectedHttp.get(`/get-order/${id}`).then(res => {
      setOrderTotal(res.data.price);
    });
  };

  const getUserByOrder = () => {
    protectedHttp.get(`/get-user-by-order/${id}`).then(res => {
      setUser(res.data);
    });
  };

  const addCommisionRecord = () => {
    setLoading(true);
    protectedHttp
      .post('/add-commision-record', {
        id,
        price: commision,
        status: paidStatus ? 1 : 0,
        paidDate: Date.now(),
      })
      .then(res => {
        setCommisionRecord(res.data);
      })
      .finally(() => setLoading(false));
  };

  const updateCommisionRecord = () => {
    setLoading(true);
    protectedHttp
      .post('/update-commision-record', {
        id: commisionRecord.id,
        price: commision,
        status: paidStatus ? 1 : 0,
        paidDate: Date.now(),
      })
      .then(res => {
        alert('Commision record has been updated');
        setCommisionRecord(res.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (commisionRecord.status === 0) {
      setPaidStatus(false);
    } else {
      setPaidStatus(true);
    }
    setCommision(commisionRecord.price);
  }, [commisionRecord]);

  useEffect(() => {
    if (isFocused) {
      getOrder();
      getUserByOrder();
      getCommisionRecord();
    }
  }, [isFocused]);

  const paymentHandler = () => setPaidStatus(!paidStatus);

  return (
    <SafeAreaView style={{flex: 1}}>
      <SingleTopbar
        title={`Commision of order #${id}`}
        navigation={navigation}
      />
      {initializing && (
        <ActivityIndicator
          color="#8200d6"
          size={24}
          style={{marginVertical: 10}}
        />
      )}
      {!initializing && (
        <>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: 18,
                marginVertical: 10,
              }}>
              Total: Rs.{orderTotal !== '0' ? orderTotal : '0'}
            </Text>
          </View>

          {!commisionRecord && (
            <>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#A9A9A9',
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginVertical: 10,
                  }}>
                  Max commision rate of user: {user ? user.max_com_rate : '0'}
                </Text>
              </View>
              <FormInputWithLink
                type="number"
                placeholder="Commision"
                handler={setCommision}
                btnLabel="Commision"
                value={commision}
              />
              <FormRadio
                handler={paymentHandler}
                value={paidStatus}
                text={paidStatus === false ? 'Unpaid' : 'Paid'}
              />
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginVertical: 10,
                  }}>
                  Commision is : Rs.{commision !== '0' ? commision : '0'}
                </Text>
              </View>
              <FormPrimaryBtn
                handler={addCommisionRecord}
                loading={loading}
                icon="ios-shield-checkmark-outline"
                label="Add record"
              />
            </>
          )}

          {commisionRecord && (
            <>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    color: 'green',
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginVertical: 10,
                  }}>
                  Commision record Already exists
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#A9A9A9',
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginVertical: 10,
                  }}>
                  Max commision rate of user: {user ? user.max_com_rate : '0'}
                </Text>
                <Text
                  style={{
                    color: 'red',
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginVertical: 10,
                  }}>
                  Paid commision is : Rs.
                  {commisionRecord ? commisionRecord.price : '0'}
                </Text>
              </View>
              <FormInputWithLink
                type="number"
                placeholder="Commision"
                handler={setCommision}
                btnLabel="Commision"
                value={commision}
              />
              <FormRadio
                handler={paymentHandler}
                value={paidStatus}
                text={paidStatus === false ? 'Unpaid' : 'Paid'}
              />
              <FormPrimaryBtn
                handler={updateCommisionRecord}
                loading={loading}
                icon="ios-shield-checkmark-outline"
                label="Update record"
              />
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default ViewCommisionRecord;
