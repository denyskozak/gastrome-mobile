import React, { useState, useContext, createContext, useEffect } from 'react';
import PropsType from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { FAVORITES_RECIPE_ID_KEY } from '../constants/asyncStoreKeys';

export const FavoritesContext = createContext({
  favorites: [],
  setFavorites: () => {},
});

// Hook
export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesContext.Provider')
  }

  const { favorites, setFavorites } = context;
  const addLike = (id) => ([...favorites, id]);
  const removeLike = (id) => (favorites.filter((like) => like !== id));
  const setLike = (id) => {
    const items = favorites.includes(id) ? removeLike(id) : addLike(id);
    setFavorites(items);
    AsyncStorage.setItem(FAVORITES_RECIPE_ID_KEY, JSON.stringify(items));
  };

  return [favorites, setLike];
};

// Component
const FavoritesComponent = (props) => {
  const {
    children,
  } = props;

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const items = await AsyncStorage.getItem(FAVORITES_RECIPE_ID_KEY);
        if (items) {
          setFavorites(JSON.parse(items));
        }
      })()
    } catch (e) {
      console.log('Favorites restore failed');
    }
  }, []);

  const value = {
    favorites,
    setFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

FavoritesComponent.propTypes = {
  children: PropsType.object.isRequired,
};

export const FavoritesContextWrapper = FavoritesComponent;