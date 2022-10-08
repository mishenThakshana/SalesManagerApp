import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {ActivityIndicator, Alert, SafeAreaView} from 'react-native';
import {SingleTopbar, StockCard, EmptyScreenFull} from 'src/components/layout';
import {protectedHttp} from 'src/helpers/HttpHelper';
import routes from 'src/constants/routes';

const ProductDetails = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const {id, name} = route.params;
  const [stocks, setStock] = useState([]);
  const [initializing, setInitializing] = useState(true);

  const loadStocks = () => {
    protectedHttp
      .get(`/get-stocks-of-product/${id}`)
      .then(res => setStock(res.data))
      .finally(() => setInitializing(false));
  };

  useEffect(() => {
    if (isFocused) {
      loadStocks();
    }
  }, [isFocused]);

  const deleteStock = id => {
    Alert.alert('Remove Stock', 'Are you sure to delete this stock record?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          setInitializing(true);
          protectedHttp
            .delete(`/stock/${id}`)
            .then(res => {
              loadStocks();
            })
            .finally(() => setInitializing(false));
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <SingleTopbar
        title={`Stock details of ${name}`}
        navigation={navigation}
      />
      {initializing && (
        <ActivityIndicator
          style={{marginVertical: 10}}
          size={25}
          color="#8200d6"
        />
      )}
      {stocks &&
        stocks.map(stock => (
          <StockCard
            key={stock.id}
            stock={stock}
            navigation={() => navigation.navigate(routes.ADJUST_STOCK, {stock})}
            deleteHandler={() => deleteStock(stock.id)}
          />
        ))}
      {stocks.length === 0 && initializing === false ? <EmptyScreenFull /> : null}
    </SafeAreaView>
  );
};

export default ProductDetails;
