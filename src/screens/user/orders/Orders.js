import {useEffect, useState} from 'react';
import {View, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import {UserTopbar, EmptyScreenFull} from 'src/components/layout';
import {UserOrderCard} from 'src/components/order';
import {protectedHttp} from 'src/helpers/HttpHelper';

const Orders = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);

  const getOrders = () => {
    protectedHttp.get(`/get-user-orders?page=${page}`).then(res => {
      if (res.data.current_page < res.data.last_page) {
        setLoader(true);
      } else {
        setLoader(false);
      }
      setOrders([...orders, ...res.data.data]);
    });
  };

  useEffect(() => {
    getOrders();
  }, [page]);

  const renderLoader = () => {
    return (
      <View>{loader && <ActivityIndicator size={28} color="#8200d6" />}</View>
    );
  };

  const loadMoreOrders = () => {
    setPage(page + 1);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <UserTopbar title="My Orders" navigation={navigation} />
      {orders.length === 0 && loader === false ? <EmptyScreenFull /> : null}
      {orders && (
        <FlatList
          data={orders}
          renderItem={({item}) => (
            <UserOrderCard item={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => String(index)}
          onEndReachedThreshold={0}
          onEndReached={loadMoreOrders}
          ListFooterComponent={renderLoader}
        />
      )}
    </SafeAreaView>
  );
};

export default Orders;
