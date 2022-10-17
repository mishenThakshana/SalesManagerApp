import {useContext} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import {UserTopbar} from 'src/components/layout';
import {ProfileOption} from 'src/components/profile';
import {protectedHttp} from 'src/helpers/HttpHelper';
import {AuthContext} from 'src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import routes from 'src/constants/routes';

const Profile = ({navigation}) => {
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
    <SafeAreaView style={{flex: 1}}>
      <UserTopbar title="Profile" navigation={navigation} />
      <ProfileOption
        action={() => navigation.navigate(routes.UPDATE_USER_PROFILE)}
        icon="ios-create-outline"
        title="Update Profile"
      />
      <ProfileOption
        action={() => logoutUser()}
        icon="ios-power-outline"
        title="Log out"
      />
    </SafeAreaView>
  );
};

export default Profile;
