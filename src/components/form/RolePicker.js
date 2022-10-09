import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const RolePicker = ({title, handler, value, array, selectedRole}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginVertical: 20,
      }}>
      <>
        <Text
          style={{
            marginVertical: 10,
            color: '#000',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
        <Picker
          style={{backgroundColor: '#B2BEB5', width: '80%'}}
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) => handler(itemValue)}>
          {selectedRole && (
            <Picker.Item
              label={selectedRole.role}
              value={selectedRole.id}
            />
          )}
          {array &&
            array.map(element => (
              <Picker.Item
                key={element.id}
                label={element.role}
                value={element.id}
              />
            ))}
        </Picker>
      </>
    </View>
  );
};

export default RolePicker;
