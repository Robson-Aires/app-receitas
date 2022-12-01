import React, { useState, useEffect } from 'react';
import '../styles/recipesDrinks.css';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { SearchAPIidrevenue } from '../services/apis';

function DetailsRecipes() {
  const { fetchLoading, fetchData } = useFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const number6 = 6;

  const { id } = useParams();
  const [dataMeals, setDataMeals] = useState({ meals: [{}] });
  const [ingredientsMeasures, setIngredientsMeasures] = useState([]);
  const [done, setDone] = useState([]);
  const [progress, setProgress] = useState({ meals: { id: null } });
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
    </div>
  );
}

export default DetailsRecipes;
