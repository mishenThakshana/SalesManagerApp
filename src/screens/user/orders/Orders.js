import {useContext, useEffect, useState} from 'react';
import {View, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import {UserTopbar, EmptyScreenFull} from 'src/components/layout';
import {UserOrderCard, CommisionCard} from 'src/components/order';
import {protectedHttp} from 'src/helpers/HttpHelper';
import {AuthContext} from 'src/context/AuthContext';

const Orders = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [commissionTotal, setCommissionTotal] = useState(0);

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

  const getCommissionEarnings = () => {
    protectedHttp.get(`get-user-total-commissions/${user.id}`).then(res => {
      if (res.data.earnings) {
        setCommissionTotal(res.data.earnings);
      }
    });
  };

  useEffect(() => {
    getCommissionEarnings();
  }, []);

  useEffect(() => {
    getOrders();
  }, [page]);

  const renderLoader = () => {
    return (
      <View>
        {loader && (
          <ActivityIndicator
            style={{marginVertical: 10}}
            size={28}
            color="#8200d6"
          />
        )}
      </View>
    );
  };

  const loadMoreOrders = () => {
    setPage(page + 1);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <UserTopbar title="My Orders" navigation={navigation} />
      <CommisionCard total={commissionTotal} />
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
