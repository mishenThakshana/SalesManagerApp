import {Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {format, subYears} from 'date-fns';

const DayPicker = ({date, handler, minDate = false, yearsBack = 1, title}) => {
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
      }}>
      <Text
        style={{
          color: '#000',
          fontSize: 18,
          marginVertical: 10,
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
      <DatePicker
        date={date}
        onDateChange={handler}
        minimumDate={
          minDate
            ? new Date(format(subYears(new Date(), yearsBack), 'yyyy-MM-dd'))
            : null
        }
        androidVariant="iosClone"
        mode="date"
        textColor="#000"
      />
    </View>
  );
};

export default DayPicker;
