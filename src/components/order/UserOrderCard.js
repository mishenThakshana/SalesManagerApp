import {View, Text, TouchableOpacity} from 'react-native';
import routes from 'src/constants/routes';
import styles from 'src/styles/Global.style';
import Ionicon from 'react-native-vector-icons/Ionicons';

const UserOrderCard = ({item, navigation}) => {
  console.log(item);
  return (
    <View style={styles.productCardContainer}>
      <View style={styles.productCardTextBlock}>
        <Text style={{fontSize: 24, color: '#fff', fontWeight: 'bold'}}>
          Order #{item.id}
        </Text>
      </View>
      <View style={styles.productCardTextBlock}>
        <Text style={{fontSize: 20, color: '#A9A9A9', fontWeight: 'bold'}}>
          {item.status === 0 ? 'Unapproved' : 'Approved'}
        </Text>
      </View>
      <View style={styles.productCardBtnContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.VIEW_ORDER_DETAILS, {
              item,
            })
          }>
          <View
            style={[
              styles.productCardBtn,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <Ionicon name="ios-eye-outline" size={22} color="#fff" />
            <Text style={{fontSize: 16, marginLeft: 5}}>View</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserOrderCard;
