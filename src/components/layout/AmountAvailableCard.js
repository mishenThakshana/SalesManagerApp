import {View, Text} from 'react-native';

const AmountAvailableCard = ({stock, cartQuantity}) => {
  return (
    <>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 40,
          marginVertical: 20,
          padding: 10,
        }}>
        <View>
          <Text style={{color: '#A9A9A9', fontSize: 20, fontWeight: 'bold'}}>
            Price
          </Text>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#000', fontSize: 24, fontWeight: 'bold'}}>
              Rs.{stock ? Math.ceil(stock.price) : '0'}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: '100%',
            width: 1,
            backgroundColor: '#A9A9A9',
          }}
        />
        <View>
          <Text style={{color: '#A9A9A9', fontSize: 20, fontWeight: 'bold'}}>
            Available Quantity
          </Text>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#000', fontSize: 24, fontWeight: 'bold'}}>
              {stock ? stock.availableQuantity : '0'}
            </Text>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={{color: 'red', fontWeight: 'bold'}}>
          Quantity in cart: {cartQuantity}
        </Text>
      </View>
    </>
  );
};

export default AmountAvailableCard;
