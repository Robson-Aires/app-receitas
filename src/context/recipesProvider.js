import React, { useState, useMemo } from 'react';
import recipesContext from './recipesContext';

export default function RecipesProvider({ children }) {
  const [data, setData] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [radio, setRadio] = useState('ingredient');
  const [loading, setLoading] = useState(true);
  const [memoryData, setMemoryData] = useState([]);
  const [searchCategory, setSearchCategory] = useState('');

  const handleFilterButton = async (url, endpoint, recipe, category) => {
    setLoading(true);
    const request = await fetch(`${url}${endpoint}`);
    const response = await request.json();

    if (category === searchCategory) {
      setData(memoryData);
    } else if (recipe === 'meals') {
      setData(response.meals);
    } else if (recipe === 'drinks') {
      setData(response.drinks);
    }
    setLoading(false);
  };

  const values = useMemo(() => ({
    data,
    loading,
    setData,
    setLoading,
    inputSearch,
    setInputSearch,
    radio,
    setRadio,
    handleFilterButton,
    memoryData,
    setMemoryData,
    setSearchCategory,
  }), [data, inputSearch, radio, loading, memoryData]);

  return (
    <recipesContext.Provider value={ values }>
      { children}
    </recipesContext.Provider>
  );
}

RecipesProvider.propTypes = {}.isRequired;
