import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const ColorChooser = ({handler, value, array}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <Text
        style={{
          color: '#000',
          marginVertical: 10,
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        Pick a color
      </Text>
      <Picker
        style={{backgroundColor: value, width: '80%'}}
        selectedValue={value}
        onValueChange={(itemValue, itemIndex) => handler(itemValue)}>
        {array &&
          array.map(element => (
            <Picker.Item key={element} label={element} value={element} />
          ))}
      </Picker>
    </View>
  );
};

export default ColorChooser;
