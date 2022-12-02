import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { SearchAPIidrink } from '../services/apiDrinks';
import useFetch from '../hooks/useFetch';
// import recipesContext from '../context/recipesContext';
import shareIcon from '../images/shareIcon.svg';
import '../styles/Details.css';

const copy = require('clipboard-copy');

function DetailsDrinks() {
  const { fetchLoading, fetchData } = useFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');

  const number6 = 6;

  const history = useHistory();

  const [progress, setProgress] = useState({ drinks: { id: null } });

  const { id } = useParams();

  const [dataDrinks, setDataDrinks] = useState({ drinks: [{}] });
  const [ingredientsMeasures, setIngredientsMeasures] = useState([]);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    const ReturnAPIDrinks = async () => {
      setDataDrinks(await SearchAPIidrink(id));
      const recipesProgress = JSON
        .parse((localStorage.getItem('inProgressRecipes') || '{"drinks": {"id": null}}'));
      setProgress(recipesProgress.drinks);
    };
    ReturnAPIDrinks();
  }, [id]);

  useEffect(() => {
    const { drinks } = dataDrinks;
    const arrIngredients = Object
      .entries(drinks[0]).filter(([chave, val]) => chave.includes('strIngredient') && val)
      .map((el) => el[1]); // [chv, val] => val
    const arrMeasures = Object
      .entries(drinks[0]).filter(([chave, val]) => chave.includes('strMeasure') && val)
      .map((el) => el[1]);
    const combineIngMeas = arrIngredients
      .map((ingr, i) => (`${ingr} ${arrMeasures[i]}`));
    // console.log(combineIngMeas);
    setIngredientsMeasures(combineIngMeas);
  }, [dataDrinks]);

  const handleSubmit = (target) => {
    const result = target;
    history.push(`/drinks/${result}/in-progress`);
  };

  const handleShare = async () => {
    setMessage(true);
    const copied = `http://localhost:3000${history.location.pathname}`;
    console.log(copied);
    const resul = await copy(copied);
    console.log(resul);
  };

  return (

    <div>
      {
        dataDrinks?.drinks?.length > 0 && (
          <>
            <img
              src={ dataDrinks?.drinks[0]?.strDrinkThumb }
              alt={ dataDrinks?.drinks[0]?.strTags }
              data-testid="recipe-photo"
            />
            <h3 data-testid="recipe-title">{ dataDrinks?.drinks[0]?.strDrink}</h3>
            {/* <p data-testid="recipe-category">{dataDrinks?.drinks[0]?.strCategory}</p> */}
            <p data-testid="recipe-category">{dataDrinks?.drinks[0]?.strAlcoholic}</p>
            <ul>
              {
                ingredientsMeasures
                  ?.map((el, index) => (
                    <li
                      key={ index }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {el}

                    </li>
                  ))
              }
            </ul>
            <p data-testid="instructions">{dataDrinks?.drinks[0]?.strInstructions}</p>

          </>
        )
      }

      <button type="button" data-testid="share-btn" onClick={ handleShare }>
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      {message && <p>Link copied!</p>}
      <br />

      { fetchLoading && <p>carregando...</p> }
      <ul className="carrosel-container">
        { !fetchLoading && fetchData.meals?.map((carrosel, index) => (
          index < number6
           && (
             <li
               data-testid={ `${index}-recommendation-card` }
               key={ index }
             >
               <p
                 data-testid={ `${index}-recommendation-title` }
               >
                 { carrosel.strMeal }
               </p>
               <input
                 className="img-carrosel"
                 type="image"
                 src={ carrosel.strMealThumb }
                 alt="asd"
               />
             </li>
           )))}
      </ul>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="btn-carrosel start"
        onClick={ () => handleSubmit(id) }
      >
        Start Recipe
      </button>
      { progress[id] && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btn-carrosel continue"
        >
          Continue Recipe
        </button>
      )}

      <button type="button" data-testid="favorite-btn">Favoritar</button>
    </div>
  );
}

export default DetailsDrinks;
