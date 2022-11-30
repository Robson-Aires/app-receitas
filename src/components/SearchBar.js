import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import { apiIngredient, apiName, apiFirstLetter } from '../services/apis';
import { apiIngredientes, apiNames, apiFirstLetters } from '../services/apiDrinks';

function SearchBar() {
  const { data, setData, inputSearch,
    radio, setRadio } = useContext(recipesContext);
  const [searchTrue, setSearchTrue] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const handleClick = () => {
    switch (radio) {
    case 'name':
      if (history.location.pathname === '/meals') {
        apiName(inputSearch).then((result) => setData(result.meals))
          .then(() => setLoading(true));
        break;
      }
      apiNames(inputSearch).then((result) => setData(result.drinks))
        .then(() => setLoading(true));
      break;
    case 'firstLetter':
      if (inputSearch.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
        break;
      }
      if (history.location.pathname === '/meals') {
        apiFirstLetter(inputSearch).then((result) => setData(result.meals))
          .then(() => setLoading(true));
        break;
      }
      apiFirstLetters(inputSearch).then((result) => setData(result.drinks))
        .then(() => setLoading(true));
      break;
    default:
      if (history.location.pathname === '/meals') {
        apiIngredient(inputSearch).then((result) => setData(result.meals))
          .then(() => setLoading(true));
        break;
      }
      apiIngredientes(inputSearch).then((result) => setData(result.drinks))
        .then(() => setLoading(true));
      break;
    }
    setSearchTrue(true);
  };

  useEffect(() => {
    if (searchTrue && data?.length === 1) {
      if (history.location.pathname === '/meals') {
        history.push(`meals/${data[0].idMeal}`);
      } else {
        history.push(`drinks/${data[0].idDrink}`);
      }
    } else if (searchTrue && loading && data === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      setSearchTrue(false);
      setLoading(false);
      setData([]);
    }
    /* console.log(data); */
  }, [data, history, loading, searchTrue, setData]);

  return (
    <div>
      <label htmlFor="searchIngredient">
        Ingrediente
        <input
          id="searchIngredient"
          value="ingredient"
          checked={ radio === 'ingredient' }
          type="radio"
          name="search"
          data-testid="ingredient-search-radio"
          onChange={ (e) => setRadio(e.target.value) }
        />
      </label>
      <label htmlFor="searchName">
        Nome
        <input
          id="searchName"
          checked={ radio === 'name' }
          type="radio"
          value="name"
          name="search"
          data-testid="name-search-radio"
          onChange={ (e) => setRadio(e.target.value) }
        />
      </label>
      <label htmlFor="searchFirstLetter">
        Primeira letra
        <input
          type="radio"
          checked={ radio === 'firstLetter' }
          value="firstLetter"
          id="searchFirstLetter"
          name="search"
          data-testid="first-letter-search-radio"
          onChange={ (e) => setRadio(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar

      </button>
      {/* <div>
        { JSON.stringify(data) }
      </div> */}
    </div>
  );
}

export default SearchBar;
