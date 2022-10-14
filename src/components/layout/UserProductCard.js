import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ImgURL} from 'src/helpers/HttpHelper';
import Ionicon from 'react-native-vector-icons/Ionicons';
import routes from 'src/constants/routes';

const UserProductCard = ({item, navigation}) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        width: 180,
        // height: ,
        padding: 10,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 10,
        alignItems: 'center',
      }}>
      <FastImage
        style={{width: 120, height: 120, marginVertical: 10}}
        source={{uri: `${ImgURL}/products/${item.images[0].image}`}}
      />
      <Text
        style={{color: '#000', fontWeight: 'bold', fontSize: 16, margin: 10}}>
        {item.name}
      </Text>
      {item.stocks.length > 0 && (
        <Text
          style={{
            color: '#A9A9A9',
            fontWeight: 'bold',
            fontSize: 16,
            margin: 2,
          }}>
          {`Rs.${item.stocks[0].selling}`}
        </Text>
      )}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(routes.VIEW_PRODUCT, {
            product: item,
          })
        }
        style={{width: '80%', justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#8200d6',
            padding: 8,
            width: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
            borderRadius: 5,
          }}>
          <Ionicon name="ios-eye-outline" color="#fff" size={18} />
          <Text style={{color: '#fff', marginLeft: 5, fontSize: 15}}>View</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UserProductCard;
