import {useCallback, useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {RefreshControl, SafeAreaView, ScrollView, View} from 'react-native';
import {protectedHttp} from 'src/helpers/HttpHelper';
import {Topbar} from 'src/components/layout';
import Card from 'src/components/layout/Card';

const Dashboard = ({navigation}) => {
  const isFocused = useIsFocused();
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const getUserCount = () => {
    return protectedHttp.get('/get-user-count').then(res => {
      setUserCount(res.data);
    });
  };

  const getProductCount = () => {
    return protectedHttp.get('/get-product-count').then(res => {
      setProductCount(res.data);
    });
  };

  const getOrderCount = () => {
    return protectedHttp.get('/get-orders-count').then(res => {
      setOrdersCount(res.data);
    });
  };

  useEffect(() => {
    if (isFocused) {
      getProductCount();
      getUserCount();
      getOrderCount();
    }
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getProductCount().then(() =>
      getUserCount().then(() => setRefreshing(false)),
    );
  }, []);

  return (
    <SafeAreaView>
      <Topbar title="Dashboard" navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#8200d6']}
          />
        }>
        <View style={{flex: 1, marginBottom: 60}}>
          {/* <Card icon="ios-cart" title="Sales" amount="120" /> */}
          <Card icon="people" title="Users" amount={userCount} />
          <Card icon="ios-pricetags" title="Products" amount={productCount} />
          <Card icon="ios-cube" title="Orders" amount={ordersCount} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
