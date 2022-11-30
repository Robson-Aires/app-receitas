import React, { useContext } from 'react';
import recipesContext from '../context/recipesContext';
import { apiIngredient, apiName, apiFirstLetter } from '../services/apis';

function SearchBar() {
  const { data, setData, inputSearch,
    radio, setRadio } = useContext(recipesContext);

  const handleClick = () => {
    switch (radio) {
    case 'ingredient':
      apiIngredient(inputSearch).then((result) => setData(result.meals));
      break;
    case 'name':
      apiName(inputSearch).then((result) => setData(result.meals));
      break;
    case 'firstLetter':
      if (inputSearch.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
        break;
      }
      apiFirstLetter(inputSearch).then((result) => setData(result.meals));
      break;
    default:
      console.log('Ops! Algo deu muuuito errado!');
      break;
    }
    console.log(apiFirstLetter);
  };

  return (
    <div>
      <label htmlFor="searchIngredient">
        Ingrediente
        <input
          id="searchIngredient"
          value="ingredient"
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
      <div>
        { JSON.stringify(data) }
      </div>
    </div>
  );
}

export default SearchBar;
