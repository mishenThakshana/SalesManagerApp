import {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {FormPrimaryBtn} from 'src/components/form';
import {CartContext} from 'src/context/CartContext';

const BottomCard = () => {
  const {cart} = useContext(CartContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log(cart.reduce((acc, curr) => acc + curr.total, 0));
    setTotal(cart.reduce((acc, curr) => acc + curr.total, 0));
  }, [cart]);
  return (
    <View style={{alignItems: 'center'}}>
      <View>
        <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
          Total: Rs.{total}
        </Text>
      </View>
      <View style={{width: '100%'}}>
        <FormPrimaryBtn icon="ios-cart-outline" label="Submit Order" />
      </View>
    </View>
  );
};

export default BottomCard;
