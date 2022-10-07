import {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {SingleTopbar} from 'src/components/layout';
import {
  FormAlert,
  FormBtnLg,
  ColorPicker,
  SizePicker,
  DayPicker,
  FormInputWithLink,
} from 'src/components/form';
import {format} from 'date-fns';
import {protectedHttp} from 'src/helpers/HttpHelper';
import {firstValueOf} from 'src/helpers/HelperFunctions';
import routes from 'src/constants/routes';

const AddStock = ({route, navigation}) => {
  const {id, name} = route.params;
  const isFocused = useIsFocused();
  const scrollRef = useRef();
  const [cost, setCost] = useState('');
  const [selling, setSelling] = useState('');
  const [discount, setDiscount] = useState('');
  const [discountType, setDiscountType] = useState('Percentage');
  const [quantity, setQuantity] = useState('');
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [color, setSelectedColor] = useState('');
  const [size, setSelectedSize] = useState('');
  const [manufatureDateObject, setManufatureDateObject] = useState(new Date());
  const [expiryDateObject, setExpiryDateObject] = useState(new Date());
  const [selectedManufactureDate, setSelectedManufactureDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const [selectedExpiryDate, setSelectedExpiryDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);

  const addStock = () => {
    setLoading(true);
    protectedHttp
      .post('/stock', {
        product_id: id,
        cost: Number(cost),
        selling: Number(selling),
        quantity: Number(quantity),
        color,
        size,
        selectedManufactureDate,
        selectedExpiryDate,
        added: Date.now(),
      })
      .then(res => {
        setError('');
        console.log(res.data);
        scrollRef.current.scrollTo({
          y: 0,
          animated: true,
        });
        setSuccess('Stock added successfully');
        setTimeout(() => {
          setSuccess('');
        }, 4000);
      })
      .catch(error => {
        scrollRef.current.scrollTo({
          y: 0,
          animated: true,
        });
        setSuccess('');
        setError(firstValueOf(error.response.data));
      })
      .finally(() => setLoading(false));
  };

  const loadColors = () => {
    protectedHttp.get('/color').then(res => {
      setColors(res.data);
      setInitializing(false);
    });
  };

  const loadSizes = () => {
    protectedHttp.get('/size').then(res => {
      setSizes(res.data);
      setInitializing(false);
    });
  };

  useEffect(() => {
    if (isFocused) {
      loadColors();
      loadSizes();
    }
  }, [isFocused]);

  useEffect(() => {
    setSelling(cost);
  }, [cost]);

  //Discount calculating
  useEffect(() => {
    if (discountType === 'Price') {
      let selling = cost - discount;
      setSelling(String(selling));
    } else {
      let parseCost = Number(cost);
      let parseDiscount = Number(discount);
      let afterDisc = parseCost * (parseDiscount / 100);
      let parseSelling = parseCost - afterDisc;
      setSelling(String(parseSelling));
    }
  }, [discount, discountType, cost]);

  const manufactureDateHandler = date => {
    setManufatureDateObject(date);
    setSelectedManufactureDate(format(date, 'yyyy-MM-dd'));
  };

  const expiryDateHandler = date => {
    setExpiryDateObject(date);
    setSelectedExpiryDate(format(date, 'yyyy-MM-dd'));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <SingleTopbar title={`Add stock to ${name}`} navigation={navigation} />
      <ScrollView ref={scrollRef}>
        <View style={{alignItems: 'center'}}>
          {success && <FormAlert message={success} type="success" />}
          {error && <FormAlert message={error} type="danger" />}
        </View>
        <View style={{marginVertical: 10}}>
          <FormInputWithLink
            handler={setCost}
            placeholder="Cost"
            type="number"
            value={cost}
            btnLabel="Cost"
          />
          <FormInputWithLink
            type="number"
            placeholder="Discount"
            handler={setDiscount}
            btnLabel={discountType}
            btnHandler={() => {
              discountType === 'Percentage'
                ? setDiscountType('Price')
                : setDiscountType('Percentage');
            }}
            value={discount}
          />
          <FormInputWithLink
            handler={setSelling}
            placeholder="Selling"
            type="number"
            disabled={true}
            value={selling}
            btnLabel="Selling"
          />
          <FormInputWithLink
            handler={setQuantity}
            placeholder="Quantity"
            type="number"
            value={quantity}
            btnLabel="Quantity"
          />
        </View>
        <ColorPicker
          initializer={initializing}
          title="Select a color"
          handler={setSelectedColor}
          value={color}
          array={colors}
          routeHandler={() => navigation.navigate(routes.ADD_COLOR)}
          routeTitle="Add new color"
        />
        <SizePicker
          initializer={initializing}
          title="Select a size"
          handler={setSelectedSize}
          value={size}
          array={sizes}
          routeHandler={() => navigation.navigate(routes.ADD_SIZE)}
          routeTitle="Add new size"
        />
        <DayPicker
          title="Manufactured Date"
          date={manufatureDateObject}
          handler={manufactureDateHandler}
          minDate={true}
          yearsBack={10}
        />
        <DayPicker
          title="Expiry Date"
          date={expiryDateObject}
          handler={expiryDateHandler}
          minDate={true}
          yearsBack={10}
        />
      </ScrollView>
      <FormBtnLg
        handler={addStock}
        icon="ios-add-circle-outline"
        label="Add Stock"
        loading={loading}
      />
    </SafeAreaView>
  );
};

export default AddStock;
