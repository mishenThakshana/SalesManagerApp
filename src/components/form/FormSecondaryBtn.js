import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const FormSecondaryBtn = ({handler, icon, label, loading = false}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity onPress={handler} style={{width: '80%'}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#2196F3',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 18,
            borderRadius: 2,
            marginVertical: 5,
          }}>
          {loading ? (
            <ActivityIndicator size={25} color="#fff" />
          ) : (
            <>
              <Ionicon name={icon} size={22} color="#fff" />
              <Text
                style={{
                  color: '#fff',
                  marginLeft: 10,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                {label}
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FormSecondaryBtn;
