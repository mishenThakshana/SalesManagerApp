import {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CartContext} from 'src/context/CartContext';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

const CartItem = ({item}) => {
  const {reduceItem, addItem} = useContext(CartContext);
  return (
    <View
      style={{
        backgroundColor: '#fff',
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        padding: 20,
        borderRadius: 5,
      }}>
      <View>
        <FastImage
          source={{
            uri: item.productImg,
          }}
          style={{width: 80, height: 80}}
        />
      </View>
      <View>
        <Text style={{color: '#A9A9A9', fontSize: 18, fontWeight: 'bold'}}>
          {item.productName}
        </Text>
        <View style={{marginVertical: 10}}>
          <Text style={{color: '#A9A9A9'}}>Size: {item.size}</Text>
          <Text style={{color: '#A9A9A9'}}>
            Color:{' '}
            <Text style={{color: '#A9A9A9'}}>
              #025454 <Text style={{color: item.colorCode}}>●</Text>
            </Text>
          </Text>
        </View>
        <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16}}>
          Rs.{item.price}
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{marginVertical: 4}}>
          <TouchableOpacity onPress={() => reduceItem(item)}>
            <Ionicon name="ios-remove-circle-outline" color="#000" size={24} />
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 4}}>
          <Text style={{color: '#000', fontSize: 18}}>{item.quantity}</Text>
        </View>
        <View style={{marginVertical: 4}}>
          <TouchableOpacity onPress={() => addItem(item)}>
            <Ionicon name="ios-add-circle-outline" color="#000" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
