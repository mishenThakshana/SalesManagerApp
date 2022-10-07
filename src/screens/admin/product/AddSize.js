import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import {SingleTopbar, ItemCard} from 'src/components/layout';
import {
  FormInput,
  FormPrimaryBtn,
  FormAlert,
  FormCancel,
} from 'src/components/form';
import {protectedHttp} from 'src/helpers/HttpHelper';

const AddSize = ({navigation}) => {
  const [size, setSize] = useState('');
  const [sizeId, setSizeId] = useState('');
  const [sizes, setSizes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    loadSizes();
  }, []);

  const addNewSize = () => {
    if (size === '') {
      alert('Size field is empty');
    } else {
      setLoading(true);
      protectedHttp
        .post('/size', {size})
        .then(res => {
          setSize('');
          setSuccess('Size Added Successfully');
          loadSizes();
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

  const loadSizes = () => {
    protectedHttp.get('/size').then(res => {
      setSizes(res.data);
      setInitializing(false);
    });
  };

  const triggerEditMode = id => {
    setSizeId(id);
    setEditMode(true);
    setSize(sizes.filter(element => element.id === id)[0].size);
  };

  const updateSize = () => {
    setLoading(true);
    protectedHttp
      .put(`/size/${sizeId}`, {size})
      .then(res => {
        loadSizes();
        setSuccess('Size Updated Successfully');
        setTimeout(() => {
          setSuccess('');
        }, 4000);
        setEditMode(!editMode);
        setSize('');
        setSizeId('');
      })
      .finally(() => setLoading(false));
  };

  const removeSize = id => {
    Alert.alert('Delete Size', 'Are you sure to delete this size?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          setInitializing(true);
          protectedHttp
            .delete(`/size/${id}`)
            .then(res => {
              loadSizes();
            })
            .finally(() => setInitializing(false));
        },
      },
    ]);
  };

  const Item = ({data, item}) => {
    const {id, size} = item;
    return (
      <ItemCard
        id={id}
        text={size}
        editHandler={triggerEditMode}
        deleteHandler={removeSize}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <SingleTopbar title="Sizes" navigation={navigation} />

      <View style={{alignItems: 'center'}}>
        {success && <FormAlert message={success} type="success" />}
      </View>
      <FormInput handler={setSize} placeholder="Size name" value={size} />
      {editMode ? (
        <FormPrimaryBtn
          icon="ios-create-outline"
          handler={updateSize}
          label="Update size"
          loading={loading}
        />
      ) : (
        <FormPrimaryBtn
          handler={addNewSize}
          icon="ios-add-circle-outline"
          label="Add new size"
          loading={loading}
        />
      )}
      {editMode && (
        <FormCancel
          handler={() => {
            setEditMode(!editMode);
            setSize('');
            setSizeId('');
          }}
        />
      )}

      {initializing ? (
        <ActivityIndicator size={25} color="#2196F3" />
      ) : (
        <FlatList
          data={sizes}
          renderItem={Item}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default AddSize;
