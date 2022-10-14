import {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([]);

  const addItemToCart = item => {
    if (!item) {
      alert('Please select available stock');
    } else {
      let itemObj = {
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        colorCode: item.colorCode,
        sizeId: item.sizeId,
        size: item.size,
        quantity: 1,
        price: item.price,
        total: item.price,
        productImg: item.productImg,
      };
      let existingItem = cart.find(cartItem => item.id === cartItem.id);
      if (existingItem) {
        if (existingItem.quantity >= item.quantity) {
          alert('No quantity left');
        } else {
          existingItem.quantity = existingItem.quantity + 1;
          existingItem.total = existingItem.price * existingItem.quantity;
          setCart(curr => [...curr]);
        }
      } else {
        setCart(crr => [...crr, itemObj]);
      }
    }
  };

  const initCart = async () => {
    try {
      const storageCart = await AsyncStorage.getItem('app_cart');
      storageCart ? setCart(JSON.parse(storageCart)) : setCart([]);
    } catch (e) {
      // read key error
    }
  };

  const reduceItem = item => {
    let existingItem = cart.find(cartItem => item.id === cartItem.id);
    if (existingItem.quantity === 1) {
      let index = cart.indexOf(existingItem);
      cart.splice(index, 1);
      setCart(curr => [...curr]);
    } else {
      existingItem.quantity = existingItem.quantity - 1;
      existingItem.total = existingItem.total - existingItem.price;
      setCart(curr => [...curr]);
    }
  };

  const addItem = item => {
    let existingItem = cart.find(cartItem => item.id === cartItem.id);
    if (existingItem) {
      existingItem.quantity = existingItem.quantity + 1;
      existingItem.total = existingItem.price * existingItem.quantity;
      setCart(curr => [...curr]);
    }
  };

  useEffect(() => {
    initCart();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('app_cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{cart, setCart, addItemToCart, reduceItem, addItem}}>
      {children}
    </CartContext.Provider>
  );
};
