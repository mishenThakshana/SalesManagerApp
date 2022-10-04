import {SafeAreaView} from 'react-native';
import {SingleTopbar} from 'src/components/layout';

const AddNewProduct = ({navigation}) => {
  return (
    <SafeAreaView>
      <SingleTopbar title="Add new product" navigation={navigation} />
    </SafeAreaView>
  );
};

export default AddNewProduct;
