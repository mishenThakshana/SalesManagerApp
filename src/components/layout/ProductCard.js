import {View, Text, TouchableOpacity} from 'react-native';
import styles from 'src/styles/Global.style';
import Ionicon from 'react-native-vector-icons/Ionicons';

const ProductCard = ({item}) => {
  return (
    <View style={styles.productCardContainer}>
      <View style={styles.productCardTextBlock}>
        <View>
          <Text style={{fontSize: 20, color: '#fff'}}>{item.name}</Text>
        </View>
        <View>
          <Text style={{fontSize: 40, color: '#fff', fontWeight: 'bold'}}>
            52
          </Text>
        </View>
      </View>
      <View style={styles.productCardBtnContainer}>
        <TouchableOpacity>
          <View style={styles.productCardBtn}>
            <Ionicon name="ios-eye-outline" size={22} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.productCardBtn}>
            <Ionicon name="ios-add-circle-outline" size={22} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
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
