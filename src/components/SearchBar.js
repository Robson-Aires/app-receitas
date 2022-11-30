import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import { apiIngredient, apiName, apiFirstLetter } from '../services/apis';
import { apiIngredientes, apiNames, apiFirstLetters } from '../services/apiDrinks';

function SearchBar() {
  const { /* data */ setData, inputSearch,
    radio, setRadio } = useContext(recipesContext);

  const history = useHistory();
  const handleClick = () => {
    switch (radio) {
    case 'name':
      if (history.location.pathname === '/meals') {
        apiName(inputSearch).then((result) => setData(result.meals));
        break;
      }
      apiNames(inputSearch).then((result) => setData(result.drinks));
      break;
    case 'firstLetter':
      if (inputSearch.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
        break;
      }
      if (history.location.pathname === '/meals') {
        apiFirstLetter(inputSearch).then((result) => setData(result.meals));
        break;
      }
      apiFirstLetters(inputSearch).then((result) => setData(result.drinks));
      break;
    default:
      if (history.location.pathname === '/meals') {
        apiIngredient(inputSearch).then((result) => setData(result.meals));
        break;
      }
      apiIngredientes(inputSearch).then((result) => setData(result.drinks));
      break;
    }
  };

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
