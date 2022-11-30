import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import recipesContext from '../context/recipesContext';
import { apiIngredientes } from '../services/apiDrinks';

function Drinks() {
  const history = useHistory();
  const number12 = 12;
  const { data, setData, setLoading, loading } = useContext(recipesContext);
  useEffect(() => {
    apiIngredientes()
      .then((result) => setData(result.drinks));
    setLoading(false);
  }, [setLoading, setData]);
  if (loading) return <p>Carregando...</p>;

  const handleSubmit = (target) => {
    const result = target;
    history.push(`/drinks/${result}`);
  };
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
               <input
                 data-testid={ `${index}-card-img` }
                 type="image"
                 alt="asd"
                 src={ Ingredient.strDrinkThumb }
                 onClick={ () => handleSubmit(Ingredient.idDrink) }
               />
             </li>
           )))}
      </ul>
      <Footer />
    </div>

  );
}

export default Drinks;
