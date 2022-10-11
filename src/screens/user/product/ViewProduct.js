import {View, Text, SafeAreaView} from 'react-native';
import {SingleTopbar} from 'src/components/layout';

const ViewProduct = ({route, navigation}) => {
  const product = route.params.product;
  return (
    <SafeAreaView>
      <SingleTopbar title={product.name} navigation={navigation} />
    </SafeAreaView>
  );
};

export default ViewProduct;
