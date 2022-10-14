import {View, Text, ActivityIndicator} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const SizeChooser = ({handler, value, array, initializer}) => {
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
        Pick a size
      </Text>
      {initializer ? (
        <ActivityIndicator size={25} color="#8200d6" />
      ) : (
        <Picker
          style={{backgroundColor: '#B2BEB5', width: '80%'}}
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) => handler(itemValue)}>
          <Picker.Item label="Select a size" value="0" />
          {array &&
            array.map(element => (
              <Picker.Item
                key={element.id}
                label={element.size}
                value={element.id}
              />
            ))}
        </Picker>
      )}
    </View>
  );
};

export default SizeChooser;
