import {View, Text} from 'react-native';
import styles from 'src/styles/Form.style';

const FormTitle = ({title}) => {
  return (
    <View>
      <Text style={styles.formTitle}>{title}</Text>
    </View>
  );
};

export default FormTitle;
