import React, { useState, useMemo } from 'react';
import recipesContext from './recipesContext';

export default function RecipesProvider({ children }) {
  const [data, setData] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [radio, setRadio] = useState('ingredient');
  const [loading, setLoading] = useState(true);

  const values = useMemo(() => ({
    data,
    loading,
    setData,
    setLoading,
    inputSearch,
    setInputSearch,
    radio,
    setRadio,
  }), [data, inputSearch, radio, loading]);

  return (
    <recipesContext.Provider value={ values }>
      { children}
    </recipesContext.Provider>
  );
}

RecipesProvider.propTypes = {}.isRequired;
