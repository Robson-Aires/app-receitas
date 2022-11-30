import React, { useState, useMemo } from 'react';
import recipesContext from './recipesContext';

export default function RecipesProvider({ children }) {
  const [data, setData] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [radio, setRadio] = useState('ingredient');

  const values = useMemo(() => ({
    data,
    setData,
    inputSearch,
    setInputSearch,
    radio,
    setRadio,
  }), [data, inputSearch, radio]);

  return (
    <recipesContext.Provider value={ values }>
      { children}
    </recipesContext.Provider>
  );
}

RecipesProvider.propTypes = {}.isRequired;
