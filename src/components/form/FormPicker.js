import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const FormPicker = ({
  initializer,
  title,
  handler,
  value,
  array,
  routeTitle,
  routeHandler,
}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginVertical: 20,
      }}>
      {initializer ? (
        <ActivityIndicator size={25} color="#2196F3" />
      ) : (
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
            <Picker.Item label="None" value={0} />
            {array &&
              array.map(element => (
                <Picker.Item
                  key={element.id}
                  label={element.category}
                  value={element.id}
                />
              ))}
          </Picker>
          <TouchableOpacity onPress={routeHandler} style={{marginVertical: 10}}>
            <Text style={{color: '#2196F3', fontSize: 15, fontWeight: 'bold'}}>
              {routeTitle}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default FormPicker;
