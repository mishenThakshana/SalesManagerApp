import {useContext} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {AuthContext} from 'src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {protectedHttp} from 'src/helpers/HttpHelper';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import UserProfile from 'src/assets/images/user-profile.jpg';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ModifiedDrawer = props => {
  const {setIsAuthenticated, setUser, setUserToken, setUserRole} =
    useContext(AuthContext);

  const logoutUser = () => {
    Alert.alert('Logout', 'Are you sure to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          protectedHttp.post('/logout').then(() => {
            try {
              AsyncStorage.clear();
              setIsAuthenticated(false);
              setUser(null);
              setUserToken(null);
              setUserRole(null);
            } catch (e) {
              // clear error
            }
          });
        },
      },
    ]);
  };
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
        <TouchableOpacity onPress={logoutUser} style={{paddingVertical: 15}}>
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
