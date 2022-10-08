import {View, Text} from 'react-native';
import {FormInputWithLink} from 'src/components/form';
import ColorPicker from 'react-native-wheel-color-picker';

const FormColorPicker = ({title, handler, value, colorPickerValue}) => {
  return (
    <>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            color: '#000',
            fontSize: 18,
            marginVertical: 10,
            fontWeight: 'bold',
          }}>
          {title ? title : 'Pick a color'}
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <ColorPicker
          thumbSize={20}
          onColorChange={color => handler(color)}
          sliderHidden={true}
          swatches={false}
          shadeWheelThumb={false}
        />
      </View>
      <FormInputWithLink
        handler={handler}
        placeholder="Color code"
        color={value}
        value={value}
      />
    </>
  );
};

export default FormColorPicker;
