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
import {protectedHttp, mediaHttp, ImgURL} from 'src/helpers/HttpHelper';
import {QHashInteger, firstValueOf} from 'src/helpers/HelperFunctions';
import routes from 'src/constants/routes';
import {launchImageLibrary} from 'react-native-image-picker';

const UpdateProduct = ({route, navigation}) => {
  const {id} = route.params;
  const isFocused = useIsFocused();
  const [imageUri, setImageUri] = useState([]);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [allowToSell, setAllowToSell] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [categoryObject, setCategoryObject] = useState();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (isFocused) {
      loadProduct();
    }
  }, [isFocused]);

  useEffect(() => {
    loadCategories();
  }, [categoryObject]);

  const loadProduct = () => {
    protectedHttp.get(`/product/${id}`).then(res => {
      const product = res.data[0][0];
      setName(product.name);
      setCode(product.code);
      setAllowToSell(product.allow_to_sell === 1 ? true : false);
      setSelectedCategory(product.cat_id);
      setCategoryObject({id: product.cat_id, category: product.category});
      let arr = [];
      res.data[1].map(image => {
        let imageUrl = `${ImgURL}/products/${image.image}`;
        arr.push({
          id: image.id,
          uri: imageUrl,
          name: image.image,
          type: `image/${image.image.split('.')[1]}`,
        });
      });
      setImageUri(arr);
    });
  };

  const loadCategories = () => {
    protectedHttp.get('/category').then(res => {
      setCategories(
        res.data.filter(category => category.id != selectedCategory),
      );
      setInitializing(false);
    });
  };

  const updateProduct = () => {
    setLoading(true);
    setError('');
    const fd = new FormData();
    for (let i = 0; i < imageUri.length; i++) {
      fd.append('images[]', imageUri[i]);
    }
    fd.append('id', id);
    fd.append('name', name);
    fd.append('code', code);
    fd.append('selectedCategory', selectedCategory);
    fd.append('allowToSell', allowToSell ? 1 : 0);
    fd.append('added', Date.now());
    mediaHttp
      .post('/update-product', fd)
      .then(res => {
        setSuccess('Product Updated Successfully');
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
      title: 'Select Images',
      type: 'Library',
      selectionLimit: 3,
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      let arr = [];
      typeof response.assets === 'object' &&
        response.assets.map(image => {
          arr.push({uri: image.uri, type: image.type, name: image.fileName});
        });
      arr.length + imageUri.length > 3
        ? alert('Only 3 images allowed')
        : setImageUri([...imageUri, ...arr]);
    });
  };

  const removeImage = val => {
    let arr = [...imageUri];
    imageUri[val] && arr.splice(val, 1);
    setImageUri(arr);
  };

  return (
    <SafeAreaView>
      <SingleTopbar title="Update product" navigation={navigation} />
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
        selectedCategory={categoryObject && categoryObject}
      />
      <FormInputWithLink
        handler={setCode}
        value={code}
        placeholder="Code"
        btnHandler={() => setCode(() => String(QHashInteger()))}
        btnLabel="Generate Code"
        type="number"
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
        handler={updateProduct}
        icon="ios-create-outline"
        label="Update Product"
        loading={loading}
      />
    </SafeAreaView>
  );
};

export default UpdateProduct;
