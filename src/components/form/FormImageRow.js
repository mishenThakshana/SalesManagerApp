import {View, ImageBackground, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const FormImageRow = ({handler, imageArray}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
      }}>
      {imageArray &&
        imageArray.map((image, index) => (
          <ImageBackground
            key={index}
            style={{width: 100, height: 100, marginHorizontal: 5}}
            source={image}
            resizeMode="cover">
            <TouchableOpacity onPress={() => handler(index)}>
              <View
                style={{
                  backgroundColor: 'red',
                  alignSelf: 'flex-end',
                  borderRadius: 5,
                }}>
                <Ionicon name="ios-close-outline" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
          </ImageBackground>
        ))}
    </View>
  );
};

export default FormImageRow;
