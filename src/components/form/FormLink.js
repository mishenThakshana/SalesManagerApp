import {View, Text, TouchableOpacity} from 'react-native';
import styles from 'src/styles/Form.style';

const FormLink = ({handler, mainText, subText}) => {
  return (
    <View style={styles.linkContainer}>
      <TouchableOpacity onPress={handler} style={styles.linkBtn}>
        <Text style={styles.linkBtnText}> {mainText} </Text>
        <Text style={[styles.linkBtnText, styles.linkBtnSubText]}>
          {subText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormLink;
