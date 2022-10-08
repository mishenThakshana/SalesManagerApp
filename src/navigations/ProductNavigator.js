import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {
  Products,
  AddNewProduct,
  Category,
  AllProducts,
  AddStock,
  AdjustStock,
  AddSize,
  ProductDetails,
} from 'src/screens/admin/product';
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
      <Stack.Screen name={routes.ALL_PRODUCTS} component={AllProducts} />
      <Stack.Screen name={routes.ADD_STOCK} component={AddStock} />
      <Stack.Screen name={routes.ADJUST_STOCK} component={AdjustStock} />
      <Stack.Screen name={routes.ADD_SIZE} component={AddSize} />
      <Stack.Screen name={routes.CATEGORY} component={Category} />
      <Stack.Screen name={routes.PRODUCT_DETAILS} component={ProductDetails} />
    </Stack.Navigator>
  );
};

export default ProductNavigator;
