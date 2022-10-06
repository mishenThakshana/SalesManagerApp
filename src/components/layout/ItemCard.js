import {View, Text, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const ItemCard = ({id, text, editHandler, deleteHandler}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 5,
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '80%',
          backgroundColor: '#fff',
          padding: 20,
        }}>
        <View>
          <Text style={{fontSize: 18, color: '#A9A9A9'}}>{text}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => deleteHandler(id)}>
            <Ionicon
              style={{marginHorizontal: 5}}
              name="trash-outline"
              size={22}
              color="red"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => editHandler(id)}>
            <Ionicon name="ios-create-outline" size={22} color="#2196F3" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ItemCard;
