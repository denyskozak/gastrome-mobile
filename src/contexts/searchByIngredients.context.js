import React, { useState, useContext, createContext  } from 'react';
import PropsType from 'prop-types';

export const SearchByIngredientsContext = createContext({
  list: [],
  setList: () => {},
});

// Hook
export const useSearchByIngredients = () => {
  const context = useContext(SearchByIngredientsContext);

  if (!context) {
    throw new Error('useSearchByIngredients must be used within a SearchByIngredientsContext.Provider')
  }

  const { list, setList } = context;

  return [list, setList];
};

// Component
const SearchByIngredientsComponent = (props) => {
  const {
    children,
  } = props;

  const [list, setList] = useState([]);

  const value = {
    list,
    setList
  };

  return (
    <SearchByIngredientsContext.Provider value={value}>
      {children}
    </SearchByIngredientsContext.Provider>
  );
};

SearchByIngredientsComponent.propTypes = {
  children: PropsType.object.isRequired,
};

export const SearchByIngredientsContextWrapper = SearchByIngredientsComponent;