import {View, Text, Switch} from 'react-native';

const FormRadio = ({handler, value, text}) => {
  return (
    <View
      style={{
        marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
        {text}
      </Text>
      <Switch
        thumbColor={value ? '#2196F3' : '#f4f3f4'}
        trackColor={{true: '#2196F3', false: '#A9A9A9'}}
        onValueChange={handler}
        value={value}
      />
    </View>
  );
};

export default FormRadio;
