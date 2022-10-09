import {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {SingleTopbar} from 'src/components/layout';
import {
  FormAlert,
  FormPrimaryBtn,
  RolePicker,
  FormInputWithLink,
  FormRadio,
  FormSecondaryBtn,
} from 'src/components/form';
import {protectedHttp} from 'src/helpers/HttpHelper';
import {firstValueOf} from 'src/helpers/HelperFunctions';
import routes from 'src/constants/routes';

const ManageUser = ({route, navigation}) => {
  const {user} = route.params;
  const isFocused = useIsFocused();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [roles, setRoles] = useState([
    {id: 1, role: 'Admin'},
    {id: 2, role: 'User'},
  ]);
  const [status, setStatus] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedRoleObject, setSelectedRoleObject] = useState({
    id: 2,
    role: 'User',
  });
  const [maxCom, setMaxCom] = useState('0');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const updateUser = () => {
    setError('');
    setLoading(true);
    protectedHttp
      .put(`/user/${user.id}`, {
        username,
        email,
        telephone,
        role: selectedRole,
        maxCom,
        status: status ? 1 : 0,
        addedDate: Date.now(),
      })
      .then(res => {
        setSuccess('User Updated Successfully');
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
    setStatus(user.status === 1 ? true : false);
    setSelectedRole(user.role);
    setSelectedRoleObject({
      id: user.role,
      role: user.role === 1 ? 'Admin' : 'User',
    });
  }, [isFocused]);

  const toggleStatus = () => setStatus(!status);

  useEffect(() => {
    setRoles(roles.filter(role => role.id !== selectedRole));
  }, [selectedRoleObject]);

  return (
    <SafeAreaView>
      <SingleTopbar
        title="Manage User"
        navigation={navigation}
        customBack={() => navigation.navigate(routes.USERS)}
      />
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
          />
          <FormInputWithLink
            handler={setTelephone}
            placeholder="Telephone"
            value={telephone}
            btnLabel="Telephone"
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
          selectedRole={selectedRoleObject}
        />

        <View style={{marginVertical: 30}}>
          <FormRadio handler={toggleStatus} value={status} text="Approved?" />
        </View>

        <FormSecondaryBtn
          handler={() =>
            navigation.navigate(routes.CHANGE_PASSWORD, {id: user.id})
          }
          icon="ios-lock-closed-outline"
          label="Change Password?"
        />
        <FormPrimaryBtn
          handler={updateUser}
          icon="ios-create-outline"
          label="Update User"
          loading={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageUser;
