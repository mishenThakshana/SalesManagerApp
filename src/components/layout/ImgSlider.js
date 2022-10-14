import {useState} from 'react';
import {View, Text, ScrollView, Dimensions, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ImgSlider = ({images}) => {
  const [imgActive, setImgActive] = useState(0);

  onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imgActive) {
        setImgActive(slide);
      }
    }
  };

  return (
    <View style={styles.sliderWrapper}>
      <ScrollView
        onScroll={({nativeEvent}) => onchange(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        style={styles.sliderWrapper}>
        {images.map((e, index) => (
          <FastImage
            key={e}
            resizeMode="contain"
            style={styles.sliderWrapper}
            source={{uri: e}}
          />
        ))}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        {images.map((e, index) => (
          <Text
            key={e}
            style={
              imgActive === index
                ? {margin: 3, color: '#8200d6'}
                : {margin: 3, color: '#fff'}
            }>
            ●
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderWrapper: {
    width: WIDTH,
    height: HEIGHT * 0.3,
  },
});

export default ImgSlider;
