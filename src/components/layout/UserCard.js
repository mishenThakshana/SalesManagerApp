import {View, Text, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import routes from 'src/constants/routes';

const UserCard = ({user, navigation}) => {
  return (
    <View
      style={{
        backgroundColor: '#8200d6',
        padding: 20,
        margin: 10,
        borderRadius: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}>
          {user.username}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.MANAGE_USER, {
              user,
            })
          }>
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: '#fff'}}>Manage User</Text>
            <Ionicon name="arrow-forward-outline" size={22} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{color: '#fff'}}>
          {user.status === 1 ? 'Approved' : 'Unapproved'}
        </Text>
      </View>
    </View>
  );
};

export default UserCard;
