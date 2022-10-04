import {View, TextInput} from 'react-native';
import styles from 'src/styles/Form.style';

const FormInput = ({handler, placeholder, type, value}) => {
  return (
    <View style={styles.formInputContainer}>
      <TextInput
        onChangeText={handler}
        keyboardType={
          type === 'email'
            ? 'email-address'
            : type === 'mobile'
            ? 'phone-pad'
            : ''
        }
        placeholder={placeholder}
        style={styles.formInput}
        placeholderTextColor="#A9A9A9"
        secureTextEntry={type === 'password' && true}
        value={value}
      />
    </View>
  );
};

export default FormInput;
