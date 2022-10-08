import {View, Text} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const EmptyScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Ionicon color="#A9A9A9" name="ios-eye-off-outline" size={50} />
      <Text style={{color: '#A9A9A9', fontSize: 20}}>No items to show</Text>
    </View>
  );
};

export default EmptyScreen;
