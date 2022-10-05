import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import {SingleTopbar, ItemCard} from 'src/components/layout';
import {FormInput, FormBtn, FormAlert, FormCancel} from 'src/components/form';
import {protectedHttp} from 'src/helpers/HttpHelper';

const Category = ({navigation}) => {
  const [category, setCategory] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const addNewCategory = () => {
    if (category === '') {
      alert('Category field is empty');
    } else {
      setLoading(true);
      protectedHttp
        .post('/category', {category})
        .then(res => {
          setCategory('');
          setSuccess('Category Added Successfully');
          loadCategories();
          setTimeout(() => {
            setSuccess('');
          }, 4000);
        })
        .catch(error => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const loadCategories = () => {
    protectedHttp.get('/category').then(res => {
      setCategories(res.data);
      setInitializing(false);
    });
  };

  const triggerEditMode = id => {
    setCategoryId(id);
    setEditMode(true);
    setCategory(categories.filter(element => element.id === id)[0].category);
  };

  const updateCategory = () => {
    setLoading(true);
    protectedHttp
      .put(`/category/${categoryId}`, {category})
      .then(res => {
        loadCategories();
        setSuccess('Category Updated Successfully');
        loadCategories();
        setTimeout(() => {
          setSuccess('');
        }, 4000);
        setEditMode(!editMode);
        setCategory('');
        setCategoryId('');
      })
      .finally(() => setLoading(false));
  };

  const removeCategory = id => {
    Alert.alert('Delete Category', 'Are you sure to delete this category?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          setInitializing(true);
          protectedHttp
            .delete(`/category/${id}`)
            .then(res => {
              loadCategories();
            })
            .finally(() => setInitializing(false));
        },
      },
    ]);
  };

  const Item = ({data, item}) => {
    const {id, category} = item;
    return (
      <ItemCard
        id={id}
        text={category}
        editHandler={triggerEditMode}
        deleteHandler={removeCategory}
      />
    );
  };

  return (
    <SafeAreaView>
      <SingleTopbar title="Categories" navigation={navigation} />
      <View style={{marginVertical: 20, alignItems: 'center'}}>
        {success && <FormAlert message={success} type="success" />}
        <FormInput
          handler={setCategory}
          placeholder="Category name"
          value={category}
        />
        {editMode ? (
          <FormBtn
            handler={updateCategory}
            label="Update category"
            loading={loading}
          />
        ) : (
          <FormBtn
            handler={addNewCategory}
            label="Add new category"
            loading={loading}
          />
        )}
        {editMode && (
          <FormCancel
            handler={() => {
              setEditMode(!editMode);
              setCategory('');
              setCategoryId('');
            }}
          />
        )}
      </View>

      {initializing ? (
        <ActivityIndicator size={25} color="#2196F3" />
      ) : (
        <FlatList
          data={categories}
          renderItem={Item}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default Category;
