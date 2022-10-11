import {View, Text} from 'react-native';

const UserTopbar = ({title}) => {
  return (
    <View style={{margin: 15}}>
      <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
        {title}
      </Text>
    </View>
  );
};

export default UserTopbar;
