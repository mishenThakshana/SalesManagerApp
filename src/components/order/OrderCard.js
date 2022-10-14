import {View, Text} from 'react-native';

const OrderCard = ({item}) => {
  return (
    <View style={{borderBottomWidth: 1, paddingBottom: 20}}>
      <View
        style={{
          flexDirection: 'row',
          width: '80%',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          marginVertical: 10,
        }}>
        <View>
          <Text style={{color: '#000', fontSize: 18}}>{item.id}</Text>
        </View>
        <View>
          <Text style={{color: '#000', fontSize: 18}}>{item.name}</Text>
        </View>
        <View>
          <Text style={{color: '#000', fontSize: 18}}>({item.quantity}</Text>
        </View>
        <View>
          <Text style={{color: '#000', fontSize: 18}}>x</Text>
        </View>
        <View>
          <Text style={{color: '#000', fontSize: 18}}>{item.selling})</Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={{color: '#000'}}>
          Color: {item.color_code}{' '}
          <Text style={{color: item.color_code}}>●</Text>
        </Text>
        <Text style={{color: '#000'}}>Size: {item.size}</Text>
      </View>
    </View>
  );
};

export default OrderCard;
