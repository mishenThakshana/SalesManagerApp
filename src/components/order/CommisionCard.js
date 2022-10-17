import {View, Text} from 'react-native';

const CommisionCard = ({total}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <View
        style={{
          backgroundColor: '#2196F3',
          width: '90%',
          padding: 20,
          borderRadius: 5,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 15, color: '#fff', fontWeight: 'bold'}}>
          Total Commission Earnings
        </Text>
        <Text
          style={{
            fontSize: 24,
            color: '#fff',
            fontWeight: 'bold',
            marginVertical: 10,
          }}>
          Rs.{total}
        </Text>
      </View>
    </View>
  );
};

export default CommisionCard;
