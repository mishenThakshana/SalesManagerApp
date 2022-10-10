import {useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {SingleTopbar} from 'src/components/layout';
import {
  FormAlert,
  FormPrimaryBtn,
  RolePicker,
  FormInputWithLink,
  FormRadio,
} from 'src/components/form';
import {protectedHttp} from 'src/helpers/HttpHelper';
import {firstValueOf} from 'src/helpers/HelperFunctions';

const AddNewUser = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState([
    {id: 2, role: 'User'},
    {id: 1, role: 'Admin'},
  ]);
  const [status, setStatus] = useState(false);
  const [selectedRole, setSelectedRole] = useState('2');
  const [maxCom, setMaxCom] = useState('0');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const addNewUser = () => {
    setError('');
    setLoading(true);
    protectedHttp
      .post(`/user`, {
        username,
        email,
        password,
        telephone,
        role: Number(selectedRole),
        maxCom,
        status: status ? 1 : 0,
        addedDate: Date.now(),
      })
      .then(res => {
        setUsername('');
        setEmail('');
        setPassword('');
        setTelephone('');
        setMaxCom('');
        setSuccess('User Added Successfully');
        setTimeout(() => {
          setSuccess('');
        }, 4000);
        console.log(res.data);
      })
      .catch(error => {
        setSuccess('');
        setError(firstValueOf(error.response.data));
      })
      .finally(() => setLoading(false));
  };

  const toggleStatus = () => setStatus(!status);

  return (
    <SafeAreaView style={{flex: 1}}>
      <SingleTopbar title="Add New User" navigation={navigation} />
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
            handler={setPassword}
            placeholder="Password"
            value={password}
            btnLabel="Password"
            type="password"
          />
          <FormInputWithLink
            handler={setTelephone}
            placeholder="Telephone"
            value={telephone}
            btnLabel="Telephone"
            type="mobile"
          />
          <FormInputWithLink
            handler={setMaxCom}
            placeholder="rate"
            value={maxCom}
            btnLabel="Max Commission"
            type="number"
          />
        </View>
        <RolePicker
          title="Select a role"
          handler={setSelectedRole}
          value={selectedRole}
          array={roles}
        />

        <View style={{marginVertical: 10}}>
          <FormRadio handler={toggleStatus} value={status} text="Approved?" />
        </View>
        <FormPrimaryBtn
          handler={addNewUser}
          icon="ios-add-circle-outline"
          label="Add New User"
          loading={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddNewUser;
