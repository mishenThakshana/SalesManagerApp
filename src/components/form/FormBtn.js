import {View, Text, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from 'src/styles/Form.style';

const FormBtn = ({handler, label, loading}) => {
  return (
    <View style={styles.formBtnContainer}>
      <TouchableOpacity onPress={handler} style={styles.formBtn}>
        {loading ? (
          <ActivityIndicator color="#fff" size={22} />
        ) : (
          <Text style={styles.formBtnLabel}>{label}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FormBtn;
