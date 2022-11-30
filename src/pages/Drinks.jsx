import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import { useHistory } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import { apiIngredientes } from '../services/apiDrinks';

function Drinks() {
  const number12 = 12;
  const { data, setData, setLoading, loading } = useContext(recipesContext);
  useEffect(() => {
    apiIngredientes()
      .then((result) => setData(result.drinks));
    setLoading(false);
  }, []);
  if (loading) return <p>Carregando...</p>;
  return (
    <div>
      <Header title="Drinks" />
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
