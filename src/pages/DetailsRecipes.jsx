import React, { useState, useEffect } from 'react';
import '../styles/recipesDrinks.css';
import { useParams, useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { SearchAPIidrevenue } from '../services/apis';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function DetailsRecipes() {
  const { fetchLoading, fetchData } = useFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const number6 = 6;
  const history = useHistory();
  const [message, setMessage] = useState(false);

  const { id } = useParams();
  const [dataMeals, setDataMeals] = useState({ meals: [{}] });
  const [ingredientsMeasures, setIngredientsMeasures] = useState([]);
  const [done, setDone] = useState([]);
  const [progress, setProgress] = useState({ meals: { id: null } });
  const [localFavorite, setLocalFavorite] = useState(false);
  useEffect(() => {
    const recipesMade = JSON.parse((localStorage.getItem('doneRecipes') || '[]'));
    setDone(recipesMade);

    const recipesProgress = JSON
      .parse((localStorage.getItem('inProgressRecipes') || '{"meals": {"id": null}}'));
    setProgress(recipesProgress.meals);
    console.log('teste', recipesProgress.meals);

    const ReturnAPIMeals = async () => {
      const request = await SearchAPIidrevenue(id);
      setDataMeals(request);
    };
    ReturnAPIMeals();
    const local = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    console.log(local);
    if (local.find((e) => e.id === id)) {
      setLocalFavorite(true);
    } else {
      setLocalFavorite(false);
    }
  }, [id]);

  useEffect(() => {
    const { meals } = dataMeals;
    const arrIngredients = Object
      .entries(meals[0]).filter(([chave, val]) => chave.includes('strIngredient') && val)
      .map((el) => el[1]); // [chv, val] => val
    const arrMeasures = Object
      .entries(meals[0]).filter(([chave, val]) => chave.includes('strMeasure') && val)
      .map((el) => el[1]);
    const combineIngMeas = arrIngredients
      .map((ingr, i) => (`${ingr} ${arrMeasures[i]}`));
    setIngredientsMeasures(combineIngMeas);
  }, [dataMeals]);

  const handleSubmit = (target) => {
    const result = target;
    history.push(`/meals/${result}/in-progress`);
  };

  const handleShare = async () => {
    setMessage(true);
    const copied = `http://localhost:3000${history.location.pathname}`;
    console.log(copied);
    const resul = await copy(copied);
    console.log(resul);
  };

  const handleFavorite = () => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    console.log(dataMeals, local);
    if (local.find((e) => e.id === id)) {
      const arr = local.filter((e) => e.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(arr));
      setLocalFavorite(false);
    } else {
      const obj = {
        id: dataMeals.meals[0].idMeal,
        type: 'meal',
        nationality: dataMeals.meals[0].strArea,
        category: dataMeals.meals[0].strCategory,
        alcoholicOrNot: '',
        name: dataMeals.meals[0].strMeal,
        image: dataMeals.meals[0].strMealThumb,
      };
      // console.log(dataMeals, local, obj);
      localStorage.setItem('favoriteRecipes', JSON.stringify([...local, obj]));
      setLocalFavorite(true);
    }
  };

  return (
    <div>
      {
        dataMeals?.meals?.length > 0 && (
          <>
            <img
              src={ dataMeals?.meals[0]?.strMealThumb }
              alt={ dataMeals?.meals[0]?.strTags }
              data-testid="recipe-photo"
            />
            <h3 data-testid="recipe-title">{ dataMeals?.meals[0]?.strMeal}</h3>
            <p data-testid="recipe-category">{dataMeals?.meals[0]?.strCategory}</p>
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
            <p data-testid="instructions">{dataMeals?.meals[0]?.strInstructions}</p>
          </>
        )
      }
      <button type="button" data-testid="share-btn" onClick={ handleShare }>
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      {message && <p>Link copied!</p>}
      <br />
      <iframe
        data-testid="video"
        title="This is a unique title"
        width="853"
        height="480"
        src={ `https://www.youtube.com/embed/${dataMeals?.meals[0]?.strYoutube?.split('watch?v=')[1]}` }
        frameBorder="0"
        allowFullScreen
        ng-show="showvideo"
      />

      { fetchLoading && <p>carregando...</p> }
      <ul className="carrosel-container">
        { !fetchLoading && fetchData.drinks?.map((carrosel, index) => (
          index < number6
           && (
             <li
               data-testid={ `${index}-recommendation-card` }
               key={ index }
             >
               <p
                 data-testid={ `${index}-recommendation-title` }
               >
                 { carrosel.strDrink }
               </p>
               <input
                 className="img-carrosel"
                 type="image"
                 src={ carrosel.strDrinkThumb }
                 alt="asd"
               />
             </li>
           )))}
      </ul>
      {done.every((e) => e.id !== id) && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btn-carrosel"
          onClick={ () => handleSubmit(id) }
        >
          Start Recipe
        </button>
      )}
      {progress[id] && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btn-carrosel"
        >
          Continue Recipe
        </button>
      )}
      <button
        type="button"
        onClick={ handleFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ localFavorite ? blackHeartIcon : whiteHeartIcon }
          alt=""
        />

      </button>
      <br />
      <br />
      <br />
    </div>
  );
}

export default DetailsRecipes;
