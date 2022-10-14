import {useContext} from 'react';
import {SafeAreaView, Text, Button, View, Alert} from 'react-native';
import {AuthContext} from 'src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {protectedHttp} from 'src/helpers/HttpHelper';

const Profile = () => {
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
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <Button onPress={logoutUser} title="Logout" />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
