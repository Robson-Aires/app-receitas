import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { SearchAPIidrevenue } from '../services/apis';

function DetailsRecipes() {
  const { id } = useParams();
  const [dataMeals, setDataMeals] = useState({ meals: [{}] });
  const [ingredientsMeasures, setIngredientsMeasures] = useState([]);
  // a função abaixo fiz apenas para fazer a requisição da API para me entregar o ID, sinta-se livre para refatorar se quiser.
  useEffect(() => {
    const ReturnAPIMeals = async () => {
      const request = await SearchAPIidrevenue(id);
      setDataMeals(request);
    };
    ReturnAPIMeals();
  }, [id]);

  useEffect(() => {
    // console.log(dataMeals);
    const { meals } = dataMeals;
    const arrIngredients = Object
      .entries(meals[0]).filter(([chave, val]) => chave.includes('strIngredient') && val)
      .map((el) => el[1]); // [chv, val] => val
    const arrMeasures = Object
      .entries(meals[0]).filter(([chave, val]) => chave.includes('strMeasure') && val)
      .map((el) => el[1]);
    const combineIngMeas = arrIngredients
      .map((ingr, i) => (`${ingr} ${arrMeasures[i]}`));
    // console.log(combineIngMeas);
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
    </div>
  );
}

export default DetailsRecipes;
