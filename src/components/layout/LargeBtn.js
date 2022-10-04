import {View, Text, TouchableOpacity} from 'react-native';
import styles from 'src/styles/Global.style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LargeBtn = ({handler, label}) => {
  return (
    <TouchableOpacity onPress={handler}>
      <View style={styles.largeBtnContainer}>
        <Text style={styles.largeBtnLabel}>{label}</Text>
        <Icon name="arrow-forward-ios" size={22} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

export default LargeBtn;
