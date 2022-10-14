import {View, Text, TouchableOpacity} from 'react-native';
import routes from 'src/constants/routes';
import styles from 'src/styles/Global.style';
import Ionicon from 'react-native-vector-icons/Ionicons';

const OrderCard = ({item, navigation, deleteHandler}) => {
  return (
    <View style={styles.productCardContainer}>
      <View style={styles.productCardTextBlock}>
        <Text style={{fontSize: 24, color: '#fff', fontWeight: 'bold'}}>
          Order #{item.id}
        </Text>
      </View>
      <View style={styles.productCardBtnContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.VIEW_ORDER, {
              id: item.id,
            })
          }>
          <View style={styles.productCardBtn}>
            <Ionicon name="ios-eye-outline" size={22} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteHandler(item.id)}>
          <View style={styles.productCardBtn}>
            <Ionicon name="ios-trash-outline" size={22} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderCard;
