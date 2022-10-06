import {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {
  FormTitle,
  FormInput,
  FormPrimaryBtn,
  FormLink,
  FormAlert,
} from 'src/components/form';
import {http} from 'src/helpers/HttpHelper';
import {firstValueOf} from 'src/helpers/HelperFunctions';
import routes from 'src/constants/routes';
import styles from 'src/styles/Global.style';

const Register = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const registerUser = () => {
    setLoading(true);
    http
      .post('/register', {username, email, telephone, password})
      .then(res => {
        setError(null);
        setSuccessMessage(null);
        setSuccessMessage(res.data.confirmation);
        setUsername('');
        setEmail('');
        setTelephone('');
        setPassword('');
      })
      .catch(error => {
        setSuccessMessage(null);
        setError(firstValueOf(error.response.data));
      })
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <FormTitle title="Register" />
      {error && <FormAlert message={error} type="danger" />}
      {successMessage && <FormAlert message={successMessage} type="success" />}
      <FormInput
        handler={setUsername}
        placeholder="Username"
        value={username}
      />
      <FormInput
        handler={setEmail}
        type="email"
        placeholder="Email"
        value={email}
      />
      <FormInput
        handler={setTelephone}
        type="telephone"
        placeholder="Telephone"
        value={telephone}
      />
      <FormInput
        handler={setPassword}
        type="password"
        placeholder="Password"
        value={password}
      />
      <View style={{width: '100%'}}>
        <FormPrimaryBtn
          handler={registerUser}
          label="Register"
          loading={loading}
          icon="ios-enter-outline"
        />
      </View>

      <FormLink
        handler={() => navigation.navigate(routes.LOGIN)}
        mainText="Already have an account?"
        subText="Login now!"
      />
    </SafeAreaView>
  );
};

export default Register;
