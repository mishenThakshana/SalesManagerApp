import {View, Text, TouchableOpacity} from 'react-native';
import styles from 'src/styles/Global.style';
import Ionicon from 'react-native-vector-icons/Ionicons';

const Topbar = ({title, navigation}) => {
  return (
    <View style={styles.topBarContainer}>
      <View>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicon name="ios-menu-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.topBarTitle}>{title}</Text>
      </View>
      <View>
        <Ionicon name="ios-notifications-sharp" size={24} color="#fff" />
      </View>
    </View>
  );
};

export default Topbar;
