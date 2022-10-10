import {View, Text, TouchableOpacity, TextInput} from 'react-native';

const FormInputWithLink = ({
  handler,
  placeholder,
  value,
  btnLabel,
  btnHandler,
  type,
  color,
  disabled = false,
}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <View
        style={{
          width: '80%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderWidth: 1,
          padding: 8,
          borderColor: '#A9A9A9',
          borderRadius: 5,
          marginVertical: 10,
        }}>
        <TextInput
          onChangeText={handler}
          placeholder={placeholder}
          style={{
            width: '60%',
            color: '#000',
          }}
          value={value}
          secureTextEntry={type === 'password' ? true : false}
          placeholderTextColor="#A9A9A9"
          keyboardType={
            type === 'email'
              ? 'email-address'
              : type === 'mobile'
              ? 'phone-pad'
              : type === 'number'
              ? 'numeric'
              : ''
          }
          editable={!disabled}
        />
        <TouchableOpacity onPress={btnHandler}>
          {btnLabel ? (
            <Text style={{color: '#2196F3', fontSize: 15, fontWeight: 'bold'}}>
              {btnLabel}
            </Text>
          ) : (
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: color,
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormInputWithLink;
