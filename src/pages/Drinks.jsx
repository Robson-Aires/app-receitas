import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import { useHistory } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import { apiIngredientes } from '../services/apiDrinks';
import useFetch from '../hooks/useFetch';

function Drinks() {
  const number12 = 12;
  const numberOfButtons = 5;
  const { data, setData, setLoading, loading,
    handleFilterButton, memoryData, setMemoryData,
    setSearchCategory } = useContext(recipesContext);
  useEffect(() => {
    apiIngredientes()
      .then((result) => {
        setData(result.drinks);
        setMemoryData(result.drinks);
      });
    setLoading(false);
  }, [setLoading, setData, setMemoryData]);

  const { fetchData, fetchLoading } = useFetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

  if (loading) return <p>Carregando...</p>;
  return (
    <div>
      <Header title="Drinks" />
      { fetchLoading ? <p>Carregando...</p> : (
        fetchData.drinks.map((category, i) => (
          i < numberOfButtons
          && (
            <button
              key={ category.strCategory }
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => {
                handleFilterButton('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=', category.strCategory, 'drinks', category.strCategory);
                setSearchCategory(category.strCategory);
              } }
            >
              {category.strCategory}
            </button>
          )
        )))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setData(memoryData) }
      >
        All
      </button>
      <ul>
        {data.map((Ingredient, index) => (
          index < number12
           && (
             <li
               data-testid={ `${index}-recipe-card` }
               key={ index }
             >
               <p data-testid={ `${index}-card-name` }>{Ingredient.strDrink}</p>
               <img
                 src={ Ingredient.strDrinkThumb }
                 alt="asdfgh"
                 data-testid={ `${index}-card-img` }
               />
             </li>
           )))}
      </ul>
      <Footer />
    </div>

  );
}

export default Drinks;
