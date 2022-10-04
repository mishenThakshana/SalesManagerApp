import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {Products, AddNewProduct, Category} from 'src/screens/admin/product';
import routes from 'src/constants/routes';

const Stack = createStackNavigator();

const ProductNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
        headerLeft: null,
      }}>
      <Stack.Screen name={routes.PRODUCTS} component={Products} />
      <Stack.Screen name={routes.ADD_NEW_PRODUCT} component={AddNewProduct} />
      <Stack.Screen name={routes.CATEGORY} component={Category} />
    </Stack.Navigator>
  );
};

export default ProductNavigator;