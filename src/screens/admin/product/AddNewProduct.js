import {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {SingleTopbar} from 'src/components/layout';
import {
  FormInput,
  FormAlert,
  FormPrimaryBtn,
  FormImageRow,
  CategoryPicker,
  FormInputWithLink,
  FormRadio,
  FormSecondaryBtn,
} from 'src/components/form';
import {protectedHttp} from 'src/helpers/HttpHelper';
import {QHashInteger, firstValueOf} from 'src/helpers/HelperFunctions';
import routes from 'src/constants/routes';
import {launchImageLibrary} from 'react-native-image-picker';

const AddNewProduct = ({navigation}) => {
  const isFocused = useIsFocused();
  const [imageUri, setImageUri] = useState([]);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [allowToSell, setAllowToSell] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
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

  const addNewProduct = () => {
    setLoading(true);
    setError('');
    protectedHttp
      .post('/product', {
        name,
        code,
        selectedCategory,
        images: imageUri,
        allowToSell: allowToSell ? 1 : 0,
        added: Date.now(),
      })
      .then(res => {
        setSuccess('Product Added Successfully');
        setName('');
        setCode('');
        setImageUri([]);
        setTimeout(() => {
          setSuccess('');
        }, 4000);
      })
      .catch(error => {
        setSuccess('');
        setError(firstValueOf(error.response.data));
      })
      .finally(() => setLoading(false));
  };

  const toggleAllowToSell = () => setAllowToSell(!allowToSell);

  const addImages = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
      selectionLimit: 3,
    };

    launchImageLibrary(options, response => {
      let arr = [];
      typeof response.assets === 'object' &&
        response.assets.map(image => {
          arr.push({uri: 'data:image/jpeg;base64,' + image.base64});
        });
      arr.length > 3 ? alert('Only 3 images allowed') : setImageUri(arr);
    });
  };

  const removeImage = val => {
    let arr = [...imageUri];
    imageUri[val] && arr.splice(val, 1);
    setImageUri(arr);
  };

  return (
    <SafeAreaView>
      <SingleTopbar title="Add new product" navigation={navigation} />
      <View style={{alignItems: 'center'}}>
        {error && <FormAlert type="danger" message={error} />}
        {success && <FormAlert type="success" message={success} />}
      </View>
      <View style={{marginTop: 10}}>
        <FormInput handler={setName} placeholder="Product Name" value={name} />
      </View>
      <CategoryPicker
        initializer={initializing}
        title="Select a category"
        handler={setSelectedCategory}
        value={selectedCategory}
        array={categories}
        routeHandler={() => navigation.navigate(routes.CATEGORY)}
        routeTitle="Add new category"
      />
      <FormInputWithLink
        handler={() => setCode(() => String(QHashInteger()))}
        value={code}
        placeholder="Code"
        btnHandler={() => setCode(() => String(QHashInteger()))}
        btnLabel="Generate Code"
      />
      <FormRadio
        handler={toggleAllowToSell}
        value={allowToSell}
        text="Allow to sell?"
      />

      <FormImageRow handler={removeImage} imageArray={imageUri} />
      <FormSecondaryBtn
        handler={addImages}
        icon="ios-images-outline"
        label="Add Images"
      />
      <FormPrimaryBtn
        handler={addNewProduct}
        icon="ios-add-circle-outline"
        label="Add New Product"
        loading={loading}
      />
    </SafeAreaView>
  );
};

export default AddNewProduct;
