import {SafeAreaView} from 'react-native';
import {Topbar, LargeBtn} from 'src/components/layout';
import routes from 'src/constants/routes';

const Products = ({navigation}) => {
  return (
    <SafeAreaView>
      <Topbar title="Products" navigation={navigation} />
      <LargeBtn
        handler={() => navigation.navigate(routes.CATEGORY)}
        label="Categories"
      />
      <LargeBtn
        handler={() => navigation.navigate(routes.ADD_NEW_PRODUCT)}
        label="Add new product"
      />
      <LargeBtn
        handler={() => navigation.navigate(routes.ALL_PRODUCTS)}
        label="All products"
      />
    </SafeAreaView>
  );
};

export default Products;
