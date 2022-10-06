import {View, Text, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const FormCancel = ({handler}) => {
  return (
    <View style={{alignItems: 'center', marginVertical: 10}}>
      <TouchableOpacity onPress={handler}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <Ionicon name="ios-close-outline" size={25} color="#D2042D" />
          <Text style={{fontSize: 16, color: '#D2042D'}}>Cancel</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FormCancel;
