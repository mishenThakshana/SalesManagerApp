import {View, Text, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const StockCard = ({stock, navigation, deleteHandler}) => {
  return (
    <View
      style={{
        backgroundColor: '#8200d6',
        padding: 20,
        margin: 10,
        borderRadius: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={{color: '#fff'}}>
            Color:{' '}
            <Text style={{backgroundColor: stock.color}}>{stock.color}</Text>
          </Text>
          <Text style={{color: '#fff'}}>Size: {stock.size}</Text>
        </View>
        <View>
          <Text style={{fontSize: 40, color: '#fff'}}>{stock.quantity}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={navigation}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: '#fff'}}>Adjust Stock</Text>
            <Ionicon name="arrow-forward-outline" size={22} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteHandler}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicon name="ios-trash-outline" size={22} color="#fff" />
            <Text style={{fontSize: 18, color: '#fff'}}>Remove Stock</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StockCard;
