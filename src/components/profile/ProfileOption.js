import {View, Text, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const ProfileOption = ({icon, title, action}) => {
  return (
    <View style={{marginHorizontal: 10}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <TouchableOpacity
          onPress={action}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: '#8200d6',
            padding: 20,
            borderRadius: 4,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Ionicon name={icon} color="#fff" size={20} />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={{color: '#fff', fontSize: 16}}>{title}</Text>
            </View>
          </View>
          <View>
            <Ionicon
              name="ios-chevron-forward-outline"
              color="#fff"
              size={20}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileOption;
