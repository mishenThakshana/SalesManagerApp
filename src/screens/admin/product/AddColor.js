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

const AddColor = ({navigation}) => {
  const [color, setColor] = useState('');
  const [colorId, setColorId] = useState('');
  const [colors, setColors] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    loadColors();
  }, []);

  const addNewColor = () => {
    if (color === '') {
      alert('Color field is empty');
    } else {
      setLoading(true);
      protectedHttp
        .post('/color', {color})
        .then(res => {
          setColor('');
          setSuccess('Color Added Successfully');
          loadColors();
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

  const loadColors = () => {
    protectedHttp.get('/color').then(res => {
      setColors(res.data);
      setInitializing(false);
    });
  };

  const triggerEditMode = id => {
    setColorId(id);
    setEditMode(true);
    setColor(colors.filter(element => element.id === id)[0].color);
  };

  const updateColor = () => {
    setLoading(true);
    protectedHttp
      .put(`/color/${colorId}`, {color})
      .then(res => {
        loadColors();
        setSuccess('Color Updated Successfully');
        setTimeout(() => {
          setSuccess('');
        }, 4000);
        setEditMode(!editMode);
        setColor('');
        setColorId('');
      })
      .finally(() => setLoading(false));
  };

  const removeColor = id => {
    Alert.alert('Delete Color', 'Are you sure to delete this color?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          setInitializing(true);
          protectedHttp
            .delete(`/color/${id}`)
            .then(res => {
              loadColors();
            })
            .finally(() => setInitializing(false));
        },
      },
    ]);
  };

  const Item = ({data, item}) => {
    const {id, color} = item;
    return (
      <ItemCard
        id={id}
        text={color}
        editHandler={triggerEditMode}
        deleteHandler={removeColor}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <SingleTopbar title="Colors" navigation={navigation} />

      <View style={{alignItems: 'center'}}>
        {success && <FormAlert message={success} type="success" />}
      </View>
      <FormInput
        handler={setColor}
        placeholder="Color name"
        value={color}
      />
      {editMode ? (
        <FormPrimaryBtn
          icon="ios-create-outline"
          handler={updateColor}
          label="Update color"
          loading={loading}
        />
      ) : (
        <FormPrimaryBtn
          handler={addNewColor}
          icon="ios-add-circle-outline"
          label="Add new color"
          loading={loading}
        />
      )}
      {editMode && (
        <FormCancel
          handler={() => {
            setEditMode(!editMode);
            setColor('');
            setColorId('');
          }}
        />
      )}

      {initializing ? (
        <ActivityIndicator size={25} color="#2196F3" />
      ) : (
        <FlatList
          data={colors}
          renderItem={Item}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default AddColor;
