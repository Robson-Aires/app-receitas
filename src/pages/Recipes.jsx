import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import { useHistory } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import { apiIngredient } from '../services/apis';

function Recipes() {
  const number12 = 12;
  const { data, setData, setLoading, loading } = useContext(recipesContext);
  useEffect(() => {
    apiIngredient()
      .then((result) => setData(result.meals));
    setLoading(false);
  }, []);
  if (loading) return <p>Carregando...</p>;
  return (
    <div>
      <Header title="Meals" />
      <ul>
        {data.map((Ingredient, index) => (
          index < number12
           && (
             <li key={ index } data-testid={ `${index}-recipe-card` }>
               <p data-testid={ `${index}-card-name` }>{Ingredient.strMeal}</p>
               <img
                 src={ Ingredient.strMealThumb }
                 alt="asdf"
                 data-testid={ `${index}-card-img` }
               />
             </li>
           )))}
      </ul>
      <Footer />
    </div>
  );
}

export default Recipes;
