import {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {AuthContext} from 'src/context/AuthContext';
import {useIsFocused} from '@react-navigation/native';
import {SingleTopbar} from 'src/components/layout';
import {
  FormAlert,
  FormPrimaryBtn,
  FormInputWithLink,
  FormSecondaryBtn,
} from 'src/components/form';
import {protectedHttp} from 'src/helpers/HttpHelper';
import {firstValueOf} from 'src/helpers/HelperFunctions';
import routes from 'src/constants/routes';

const UpdateProfile = ({navigation}) => {
  const {user, setUser} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const updateUser = () => {
    setError('');
    setLoading(true);
    protectedHttp
      .post(`/update-user-profile`, {
        id: user.id,
        username,
        email,
        telephone,
      })
      .then(res => {
        setUser(res.data);
        setSuccess('Profile Updated Successfully');
        setTimeout(() => {
          setSuccess('');
        }, 4000);
      })
      .catch(error => {
        setSuccess('');
        setError(firstValueOf(error.response.data));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setTelephone(user.telephone);
  }, [isFocused]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <SingleTopbar title="Update Profile" navigation={navigation} />
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          {error && <FormAlert type="danger" message={error} />}
          {success && <FormAlert type="success" message={success} />}
        </View>
        <View style={{marginTop: 10}}>
          <FormInputWithLink
            handler={setUsername}
            placeholder="Username"
            value={username}
            btnLabel="Username"
          />
          <FormInputWithLink
            handler={setEmail}
            placeholder="Email"
            value={email}
            btnLabel="Email"
            type="email"
          />
          <FormInputWithLink
            handler={setTelephone}
            placeholder="Telephone"
            value={telephone}
            btnLabel="Telephone"
            type="mobile"
          />
        </View>

        <FormSecondaryBtn
          handler={() =>
            navigation.navigate(routes.CHANGE_USER_PASSWORD, {id: user.id})
          }
          icon="ios-lock-closed-outline"
          label="Change Password?"
        />

        <FormPrimaryBtn
          handler={updateUser}
          icon="ios-create-outline"
          label="Update Profile"
          loading={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateProfile;
