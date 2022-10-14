import {View, Text, TouchableOpacity} from 'react-native';
import styles from 'src/styles/Global.style';
import routes from 'src/constants/routes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

const SingleTopbar = ({
  title,
  navigation,
  customBack,
  cart = false,
  cartEmpty = false,
  cartEmptyHandler,
}) => {
  return (
    <View style={styles.topBarContainer}>
      <View>
        {customBack ? (
          <TouchableOpacity onPress={customBack}>
            <Icon name="arrow-back-ios" size={26} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={26} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
      <View>
        <Text style={styles.topBarTitle}>{title}</Text>
      </View>
      <View>
        {cart && (
          <TouchableOpacity onPress={() => navigation.navigate(routes.CART)}>
            <View style={{marginHorizontal: 10}}>
              <Ionicon name="ios-cart-outline" color="#fff" size={28} />
            </View>
          </TouchableOpacity>
        )}
        {cartEmpty && (
          <TouchableOpacity onPress={cartEmptyHandler}>
            <View style={{marginHorizontal: 10}}>
              <Ionicon name="ios-trash-outline" color="#fff" size={22} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SingleTopbar;
