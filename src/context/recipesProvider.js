import React, { useState, useMemo } from 'react';
import recipesContext from './recipesContext';

export default function RecipesProvider({ children }) {
  const [done, setDone] = useState([]);
  const [data, setData] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [radio, setRadio] = useState('ingredient');
  const [loading, setLoading] = useState(true);
  const [memoryData, setMemoryData] = useState([]);
  const [toggle, setToggle] = useState(true);

  const values = useMemo(() => {
    const handleFilterButton = async (url, endpoint, recipe) => {
      setLoading(true);
      const request = await fetch(`${url}${endpoint}`);
      const response = await request.json();

      if (recipe === 'meals' && toggle) {
        setData(response.meals);
      } else if (recipe === 'drinks' && toggle) {
        setData(response.drinks);
      } else {
        setData(memoryData);
      }
      setLoading(false);
    };
    return {
      data,
      done,
      setDone,
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
      setToggle,
      toggle,
    };
  }, [data, done, loading, inputSearch, radio, memoryData, toggle]);

  return (
    <recipesContext.Provider value={ values }>
      { children}
    </recipesContext.Provider>
  );
}

RecipesProvider.propTypes = {}.isRequired;
