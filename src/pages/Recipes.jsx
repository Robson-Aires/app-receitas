import React, { useEffect, useContext } from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import recipesContext from '../context/recipesContext';
import useFetch from '../hooks/useFetch';
import { apiIngredient } from '../services/apis';

function Recipes() {
  const history = useHistory();
  const number12 = 12;
  const numberOfButtons = 5;
  const { data, setData, setLoading, loading,
    handleFilterButton, memoryData, setMemoryData,
    setSearchCategory } = useContext(recipesContext);
  useEffect(() => {
    apiIngredient()
      .then((result) => {
        setData(result.meals);
        setMemoryData(result.meals);
      });
    setLoading(false);

  }, [setLoading, setData, setMemoryData]);

  const handleSubmit = (target) => {
    const result = target;
    history.push(`/meals/${result}`);
  };
  const { fetchData, fetchLoading } = useFetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

  if (loading) return <p>Carregando...</p>;
  return (
    <div>
      <Header title="Meals" />
      { fetchLoading ? <p>Carregando...</p> : (
        fetchData.meals.map((category, i) => (
          i < numberOfButtons
          && (
            <button
              key={ category.strCategory }
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => {
                handleFilterButton('https://www.themealdb.com/api/json/v1/1/filter.php?c=', category.strCategory, 'meals', category.strCategory);
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
               key={ index }
               data-testid={ `${index}-recipe-card` }
             >
               <p data-testid={ `${index}-card-name` }>{Ingredient.strMeal}</p>
               <input
                 data-testid={ `${index}-card-img` }
                 type="image"
                 alt="asd"
                 src={ Ingredient.strMealThumb }
                 onClick={ () => handleSubmit(Ingredient.idMeal) }
               />
             </li>
           )))}
      </ul>
      <Footer />
    </div>
  );
}

// Recipes.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }).isRequired,

export default Recipes;
