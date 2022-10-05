import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {SingleTopbar} from 'src/components/layout';
import {FormInput, FormBtn, FormAlert} from 'src/components/form';
import {protectedHttp} from 'src/helpers/HttpHelper';
import routes from 'src/constants/routes';

const AddNewProduct = ({navigation}) => {
  const isFocused = useIsFocused();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (isFocused) loadCategories();
  }, [isFocused]);

  const loadCategories = () => {
    protectedHttp.get('/category').then(res => {
      setCategories(res.data);
      setInitializing(false);
    });
  };

  return (
    <SafeAreaView>
      <SingleTopbar title="Add new product" navigation={navigation} />
      <View style={{marginVertical: 5}}>
        <FormInput placeholder="Product Name" />
        <View
          style={{
            alignItems: 'center',
          }}>
          {initializing ? (
            <ActivityIndicator size={25} color="#2196F3" />
          ) : (
            <>
              <Text
                style={{
                  marginVertical: 10,
                  color: '#000',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Select a category
              </Text>
              <Picker
                style={{backgroundColor: '#B2BEB5', width: '80%'}}
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCategory(itemValue)
                }>
                {categories &&
                  categories.map(element => (
                    <Picker.Item
                      key={element.id}
                      label={element.category}
                      value={element.id}
                    />
                  ))}
              </Picker>
              <TouchableOpacity
                onPress={() => navigation.navigate(routes.CATEGORY)}
                style={{marginVertical: 10}}>
                <Text
                  style={{color: '#2196F3', fontSize: 15, fontWeight: 'bold'}}>
                  Add new category?
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddNewProduct;
