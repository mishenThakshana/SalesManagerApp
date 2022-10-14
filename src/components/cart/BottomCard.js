import {useContext, useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {FormPrimaryBtn} from 'src/components/form';
import {CartContext} from 'src/context/CartContext';
import {protectedHttp} from 'src/helpers/HttpHelper';
import {firstValueOf} from 'src/helpers/HelperFunctions';

const BottomCard = () => {
  const {cart, setCart} = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + curr.total, 0));
  }, [cart]);

  const submitOrder = () => {
    setLoading(true);
    protectedHttp
      .post('/order', {cart, total, added: Date.now()})
      .then(res => {
        setCart([]);
        Alert.alert('Success', 'Order Submitted Successfully');
      })
      .catch(error => Alert.alert('Error', firstValueOf(error.response.data)))
      .finally(() => setLoading(false));
  };

  return (
    <View style={{alignItems: 'center'}}>
      <View style={{marginVertical: 10}}>
        <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
          Total: Rs.{total}
        </Text>
      </View>
      <View style={{width: '100%'}}>
        <FormPrimaryBtn
          handler={submitOrder}
          loading={loading}
          icon="ios-cart-outline"
          label="Submit Order"
        />
      </View>
    </View>
  );
};

export default BottomCard;
