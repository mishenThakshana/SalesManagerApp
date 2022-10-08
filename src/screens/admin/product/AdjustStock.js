import {useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {SingleTopbar} from 'src/components/layout';
import {
  FormAlert,
  FormBtnLg,
  DayPicker,
  FormInputWithLink,
} from 'src/components/form';
import {format} from 'date-fns';
import {protectedHttp} from 'src/helpers/HttpHelper';
import {firstValueOf} from 'src/helpers/HelperFunctions';

const AdjustStock = ({route, navigation}) => {
  const {stock} = route.params;
  const isFocused = useIsFocused();
  const scrollRef = useRef();
  const [cost, setCost] = useState('');
  const [selling, setSelling] = useState('');
  const [discount, setDiscount] = useState('');
  const [discountType, setDiscountType] = useState('Price');
  const [quantity, setQuantity] = useState('');
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
  const [loading, setLoading] = useState(false);

  const adjustStock = () => {
    const id = stock.id;
    setLoading(true);
    protectedHttp
      .put(`/stock/${id}`, {
        product_id: id,
        cost: Number(cost),
        selling: Number(selling),
        quantity: Number(quantity),
        selectedManufactureDate,
        selectedExpiryDate,
        added: Date.now(),
      })
      .then(res => {
        setError('');
        scrollRef.current.scrollTo({
          y: 0,
          animated: true,
        });
        setSuccess('Stock adjusted successfully');
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

  useEffect(() => {
    if (isFocused) {
      setCost(stock.cost.split('.')[0]);
      setSelling(stock.selling);
      setDiscount(String(stock.cost - stock.selling));
      setQuantity(String(stock.quantity));
      setManufatureDateObject(new Date(stock.man_date));
      setExpiryDateObject(new Date(stock.exp_date));
    }
  }, [isFocused]);

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
      <SingleTopbar title={`Adjust stock`} navigation={navigation} />
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
        handler={adjustStock}
        icon="ios-create-outline"
        label="Adjust Stock"
        loading={loading}
      />
    </SafeAreaView>
  );
};

export default AdjustStock;
