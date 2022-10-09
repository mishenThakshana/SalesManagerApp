import {View, Text, TouchableOpacity} from 'react-native';
import styles from 'src/styles/Global.style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SingleTopbar = ({title, navigation, customBack}) => {
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
      <View></View>
    </View>
  );
};

export default SingleTopbar;
