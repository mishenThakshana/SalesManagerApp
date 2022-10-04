import {useState, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {AuthContext} from 'src/context/AuthContext';
import {
  FormTitle,
  FormInput,
  FormBtn,
  FormLink,
  FormAlert,
} from 'src/components/form';
import {http} from 'src/helpers/HttpHelper';
import {firstValueOf} from 'src/helpers/HelperFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import routes from 'src/constants/routes';
import styles from 'src/styles/Global.style';

const Login = ({navigation}) => {
  const {setUser, setUserToken, setUserRole} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = () => {
    setLoading(true);
    http
      .post('/login', {email, password})
      .then(res => {
        setError(null);
        setUser(res.data.user);
        setUserToken(res.data.token);
        setUserRole(res.data.user.role);
        AsyncStorage.setItem('app_user', JSON.stringify(res.data.user));
        AsyncStorage.setItem('app_user_token', JSON.stringify(res.data.token));
        AsyncStorage.setItem('app_user_role', JSON.stringify(res.data.user.role));
      })
      .catch(error => setError(firstValueOf(error.response.data)))
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <FormTitle title="Login" />
      {error && <FormAlert message={error} type="danger" />}
      <FormInput handler={setEmail} type="email" placeholder="Email" />
      <FormInput handler={setPassword} type="password" placeholder="Password" />
      <FormBtn handler={loginUser} label="Login" loading={loading} />
      <FormLink
        handler={() => navigation.navigate(routes.REGISTER)}
        mainText="Don't have an account?"
        subText="Register now!"
      />
    </SafeAreaView>
  );
};

export default Login;
