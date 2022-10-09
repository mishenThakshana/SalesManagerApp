import {View, Text, TouchableOpacity} from 'react-native';
import routes from 'src/constants/routes';
import styles from 'src/styles/Global.style';
import Ionicon from 'react-native-vector-icons/Ionicons';

const ProductCard = ({item, navigation}) => {
  return (
    <View style={styles.productCardContainer}>
      <View style={styles.productCardTextBlock}>
        <Text style={{fontSize: 24, color: '#fff', fontWeight: 'bold'}}>
          {item.name}
        </Text>
      </View>
      <View style={styles.productCardBtnContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.PRODUCT_DETAILS, {
              id: item.id,
              name: item.name,
            })
          }>
          <View style={styles.productCardBtn}>
            <Ionicon name="ios-eye-outline" size={22} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.ADD_STOCK, {
              id: item.id,
              name: item.name,
            })
          }>
          <View style={styles.productCardBtn}>
            <Ionicon name="ios-add-circle-outline" size={22} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.UPDATE_PRODUCT, {
              id: item.id,
            })
          }>
          <View style={styles.productCardBtn}>
            <Ionicon name="ios-create-outline" size={22} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.productCardBtn}>
            <Ionicon name="ios-trash-outline" size={22} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;
