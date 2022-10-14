import {View, Text, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import routes from 'src/constants/routes';

const UserTopbar = ({title, navigation}) => {
  return (
    <View
      style={{
        margin: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View>
        <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
          {title}
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate(routes.CART)}>
          <View style={{marginHorizontal: 10}}>
            <Ionicon name="ios-cart-outline" color="#000" size={28} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserTopbar;
