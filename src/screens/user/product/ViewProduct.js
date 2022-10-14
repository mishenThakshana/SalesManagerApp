import {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {CartContext} from 'src/context/CartContext';
import {FormPrimaryBtn} from 'src/components/form';
import {
  SingleTopbar,
  ImgSlider,
  ColorChooser,
  SizeChooser,
  AmountAvailableCard,
} from 'src/components/layout';
import {ImgURL} from 'src/helpers/HttpHelper';
import {protectedHttp} from 'src/helpers/HttpHelper';

const ViewProduct = ({route, navigation}) => {
  const {cart, addItemToCart} = useContext(CartContext);
  const product = route.params.product;
  const [images, setImages] = useState([]);
  const [stock, setStock] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [choosedColor, setChoosedColor] = useState('');
  const [choosedSize, setChoosedSize] = useState('');
  const [selectedStock, setSelectedStock] = useState('');
  const [initializer, setInitializing] = useState(true);
  const [inCartQuantity, setInCartQuantity] = useState(0);

  const loadSizes = () => {
    protectedHttp.get('/size').then(res => {
      setSizes(res.data);
      setInitializing(false);
    });
  };

  useEffect(() => {
    setImages(product.images.map(image => `${ImgURL}/products/${image.image}`));
    setStock(product.stocks);
    setColors(product.stocks.map(stock => stock.color_code));
    loadSizes();
  }, [product]);

  useEffect(() => {
    setInCartQuantity(0);
    setSelectedStock('');
    stock.map(item => {
      if (item.color_code === choosedColor && item.size_id === choosedSize) {
        let itemObj = {
          id: item.id,
          productId: item.product_id,
          productName: product.name,
          colorCode: item.color_code,
          sizeId: item.size_id,
          size: sizes.filter(size => item.size_id === size.id)[0].size,
          price: item.selling,
          productImg: `${ImgURL}/products/${product.images[0].image}`,
          availableQuantity: item.quantity,
        };
        setSelectedStock(itemObj);
      }
    });
  }, [choosedColor, choosedSize]);

  // useEffect(() => {
  //   console.log(cart);
  // }, [cart]);

  useEffect(() => {
    cart.map(cartItem => {
      if (cartItem.id === selectedStock.id) {
        setInCartQuantity(cartItem.quantity);
      }
    });
  }, [selectedStock, cart]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <SingleTopbar title={product.name} navigation={navigation} cart />
      <ScrollView>
        <ImgSlider images={images} />
        {colors && (
          <ColorChooser
            handler={setChoosedColor}
            array={colors}
            value={choosedColor}
          />
        )}
        {sizes && (
          <SizeChooser
            handler={setChoosedSize}
            array={sizes}
            value={choosedSize}
            initializer={initializer}
          />
        )}
        <AmountAvailableCard
          stock={selectedStock}
          cartQuantity={inCartQuantity}
        />

        <FormPrimaryBtn
          handler={() => addItemToCart(selectedStock)}
          icon="ios-cart-outline"
          label="Add to cart"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewProduct;
