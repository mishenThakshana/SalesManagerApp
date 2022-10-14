import {useContext} from 'react';
import {Alert, SafeAreaView, ScrollView} from 'react-native';
import {CartContext} from 'src/context/CartContext';
import {SingleTopbar, EmptyScreenFull} from 'src/components/layout';
import {CartItem, BottomCard} from 'src/components/cart';

const Cart = ({navigation}) => {
  const {cart, setCart} = useContext(CartContext);
  const emptyCartHandler = () => {
    Alert.alert('Empty the cart', 'Are you sure to empty the cart?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          setCart([]);
        },
      },
    ]);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <SingleTopbar
        title="Cart"
        navigation={navigation}
        cartEmpty
        cartEmptyHandler={emptyCartHandler}
      />
      {cart.length > 0 ? (
        <>
          <ScrollView style={{flex: 1}}>
            {cart.map(cartItem => (
              <CartItem key={cartItem.id} item={cartItem} />
            ))}
          </ScrollView>
          <BottomCard />
        </>
      ) : (
        <EmptyScreenFull />
      )}
    </SafeAreaView>
  );
};

export default Cart;
