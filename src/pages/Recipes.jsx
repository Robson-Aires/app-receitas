import React, { useEffect, useContext } from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import recipesContext from '../context/recipesContext';
import { apiIngredient } from '../services/apis';

function Recipes() {
  const history = useHistory();
  const number12 = 12;
  const { data, setData, setLoading, loading } = useContext(recipesContext);
  useEffect(() => {
    apiIngredient()
      .then((result) => setData(result.meals));
    setLoading(false);
  }, [setLoading, setData]);

  const handleSubmit = (target) => {
    const result = target;
    history.push(`/meals/${result}`);
  };
  if (loading) return <p>Carregando...</p>;
  return (
    <div>
      <Header title="Meals" />
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
