import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import UserProfile from 'src/assets/images/user-profile.jpg';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ModifiedDrawer = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#8200d6'}}>
        <View style={{padding: 20}}>
          <Image
            source={UserProfile}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
            Mishen Thakshana
          </Text>
          <Text style={{color: '#fff'}}>Admin</Text>
        </View>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="ios-power-outline" size={22} color="#000" />
            <Text style={{fontSize: 15, marginLeft: 8, color: '#000'}}>
              Log out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModifiedDrawer;
