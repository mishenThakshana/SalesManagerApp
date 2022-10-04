import {View, Text, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const Card = ({handler, icon, title, amount}) => {
  return (
    <View
      style={{
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        backgroundColor: '#8200d6',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          paddingVertical: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Ionicon style={{color: '#fff'}} name={icon} size={35} color="#fff" />
          <Text
            style={{
              marginLeft: 10,
              color: '#fff',
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            {title}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: '#fff',
              fontSize: 45,
              fontWeight: 'bold',
            }}>
            {amount}
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={handler}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
              paddingVertical: 20,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#fff',
                marginRight: 5,
                fontSize: 18,
              }}>
              Read more
            </Text>
            <Ionicon name="arrow-forward-outline" size={22} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;
