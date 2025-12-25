import React, { useState, useContext, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CART_KEY } from '../constants/asyncStoreKeys';

export const MenuCartContext = createContext([]);

// Hook
export const useMenuCart = () => {
  const context = useContext(MenuCartContext);

  if (!context) {
    throw new Error('useMenuCart must be used within a MenuCartContext.Provider')
  }

  const {cart, setCart} = context;

  const handleSet = (items) => {
    setCart(items);
    AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
  };

  const handleAdd = (ingredients = []) => {
    handleSet([...ingredients, ...cart]);
  };

  return [cart, handleAdd, handleSet];
};

// Component
const MenuCartComponent = (props) => {
  const {
    children,
  } = props;

  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const items = await AsyncStorage.getItem(CART_KEY);
        if (items) {
          setCart(JSON.parse(items));
        }
      })()
    } catch (e) {
      console.log('Cart restore failed');
    }
  }, []);

  const value = {
    cart,
    setCart
  };

  return (
    <MenuCartContext.Provider value={value}>
      {children}
    </MenuCartContext.Provider>
  );
};

export const MenuCartContextWrapper = MenuCartComponent;
