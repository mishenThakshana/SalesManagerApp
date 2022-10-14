import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const SizePicker = ({
  initializer,
  title,
  handler,
  value,
  array,
  routeTitle,
  routeHandler,
  selectedSize,
}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginVertical: 20,
      }}>
      {initializer ? (
        <ActivityIndicator size={25} color="#8200d6" />
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
            {selectedSize ? (
              <Picker.Item
                label={selectedSize.size}
                value={selectedSize.size_id}
              />
            ) : (
              <Picker.Item label="None" value={0} />
            )}
            {array &&
              array.map(element => (
                <Picker.Item
                  key={element.id}
                  label={element.size}
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

export default SizePicker;
