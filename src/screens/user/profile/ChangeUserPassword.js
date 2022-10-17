import {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {SingleTopbar} from 'src/components/layout';
import {FormAlert, FormPrimaryBtn, FormInput} from 'src/components/form';
import {protectedHttp} from 'src/helpers/HttpHelper';
import {firstValueOf} from 'src/helpers/HelperFunctions';

const ChangeUserPassword = ({route, navigation}) => {
  const {id} = route.params;
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const updatePassword = () => {
    setError('');
    setLoading(true);
    protectedHttp
      .post(`/change-user-password`, {
        id,
        password,
        password_confirmation: passwordConfirm,
      })
      .then(res => {
        setPassword('');
        setPasswordConfirm('');
        setSuccess('Password Updated Successfully');
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

  return (
    <SafeAreaView>
      <SingleTopbar title="Change Password" navigation={navigation} />
      <View style={{alignItems: 'center'}}>
        {error && <FormAlert type="danger" message={error} />}
        {success && <FormAlert type="success" message={success} />}
      </View>
      <View style={{marginTop: 10}}>
        <FormInput
          handler={setPassword}
          placeholder="Password"
          value={password}
          type="password"
        />
        <FormInput
          handler={setPasswordConfirm}
          placeholder="Confirm Password"
          value={passwordConfirm}
          type="password"
        />
      </View>
      <FormPrimaryBtn
        handler={updatePassword}
        icon="ios-create-outline"
        label="Update Password"
        loading={loading}
      />
    </SafeAreaView>
  );
};

export default ChangeUserPassword;
