import {View, Text} from 'react-native';
import styles from 'src/styles/Form.style';

const FormAlert = ({message, type}) => {
  return (
    <View
      style={[
        styles.formAlertContainer,
        type === 'danger'
          ? {backgroundColor: '#D2042D'}
          : {backgroundColor: '#228B22'},
      ]}>
      <Text style={styles.formAlertMessage}>{message}</Text>
    </View>
  );
};

export default FormAlert;
