import {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {SingleTopbar, EmptyScreenFull, OrderCard} from 'src/components/layout';
import {protectedHttp} from 'src/helpers/HttpHelper';

const AllOrders = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);

  const getOrders = () => {
    protectedHttp.get(`/order?page=${page}`).then(res => {
      if (res.data.current_page < res.data.last_page) {
        setLoader(true);
      } else {
        setLoader(false);
      }
      setOrders([...orders, ...res.data.data]);
    });
  };

  const deleteOrder = id => {
    Alert.alert('Remove Order', 'Are you sure to delete this order?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          protectedHttp
            .delete(`/order/${id}`)
            .then(res => {
              setOrders(orders.filter(order => order.id !== id));
              console.log(res.data);
            })
            .catch(error => console.log('error'));
        },
      },
    ]);
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
      <SingleTopbar title="All orders" navigation={navigation} />
      {orders.length === 0 && loader === false ? <EmptyScreenFull /> : null}
      {orders && (
        <FlatList
          data={orders}
          renderItem={({item}) => (
            <OrderCard
              item={item}
              navigation={navigation}
              deleteHandler={deleteOrder}
            />
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

export default AllOrders;
