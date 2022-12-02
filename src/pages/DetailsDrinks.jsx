import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { SearchAPIidrink } from '../services/apiDrinks';
import useFetch from '../hooks/useFetch';
// import recipesContext from '../context/recipesContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

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
  const [localFavorite, setLocalFavorite] = useState(false);

  useEffect(() => {
    const ReturnAPIDrinks = async () => {
      setDataDrinks(await SearchAPIidrink(id));
      const recipesProgress = JSON
        .parse((localStorage.getItem('inProgressRecipes') || '{"drinks": {"id": null}}'));
      setProgress(recipesProgress.drinks);
    };
    ReturnAPIDrinks();
    const local = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    console.log(local);
    if (local.find((e) => e.id === id)) {
      setLocalFavorite(true);
    } else {
      setLocalFavorite(false);
    }
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

  const handleFavorite = () => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    console.log(dataDrinks, local);
    if (local.find((e) => e.id === id)) {
      const arr = local.filter((e) => e.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(arr));
      setLocalFavorite(false);
    } else {
      const obj = {
        id: dataDrinks.drinks[0].idDrink,
        type: 'drink',
        nationality: '',
        category: dataDrinks.drinks[0].strCategory,
        alcoholicOrNot: dataDrinks.drinks[0].strAlcoholic,
        name: dataDrinks.drinks[0].strDrink,
        image: dataDrinks.drinks[0].strDrinkThumb,
      };
      // console.log(dataMeals, local, obj);
      localStorage.setItem('favoriteRecipes', JSON.stringify([...local, obj]));
      setLocalFavorite(true);
    }
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
        className="btn-carrosel"
        onClick={ () => handleSubmit(id) }
      >
        Start Recipe
      </button>
      { progress[id] && (
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

export default DetailsDrinks;
