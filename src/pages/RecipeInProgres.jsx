import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const objStyle = { textDecoration: 'line-through solid rgb(0, 0, 0)' };
const objNone = { textDecoration: 'none' };

function RecipeInProgres() {
  const { id } = useParams();
  const { fetchData, fetchLoading } = useFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const [objChks, setObjChks] = useState({});

  const hendleCheckbox = ({ target }) => {
    const { name, checked } = target;
    if (checked) {
      setObjChks({ ...objChks, [name]: true });
    } else {
      setObjChks({ ...objChks, [name]: false });
    }
  };

  console.log(fetchData);
  if (fetchLoading) { return <p>Carregando...</p>; }
  return (
    <div>
      <img src={ fetchData?.meals[0]?.strMealThumb } alt="" data-testid="recipe-photo" />
      <h4 data-testid="recipe-title">{fetchData?.meals[0]?.strMeal}</h4>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Fav</button>
      <p data-testid="recipe-category">{fetchData?.meals[0]?.strCategory}</p>
      <p data-testid="instructions">{fetchData?.meals[0]?.strInstructions}</p>

      <div className="checkboxes" style={ { display: 'flex', flexDirection: 'column' } }>
        { Object.entries(fetchData?.meals[0])
          .filter(([chv, val]) => chv.includes('strIngredient') && val)
          .map(([, val]) => val)
          .map((e, i) => (
            <label
              key={ i }
              data-testid={ `${i}-ingredient-step` }
              htmlFor={ `ingredient-${i}` }
              style={ (objChks[`ingredient-${i}`]) ? objStyle : objNone }
            >
              <input
                type="checkbox"
                id={ `ingredient-${i}` }
                name={ `ingredient-${i}` }
                onChange={ hendleCheckbox }
              />
              {e}
            </label>
          )) }

      </div>
      <button data-testid="finish-recipe-btn" type="button">Finalizar</button>
    </div>
  );
}

export default RecipeInProgres;
