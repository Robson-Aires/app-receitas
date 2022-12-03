import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const objStyle = { textDecoration: 'line-through solid rgb(0, 0, 0)' };
const objNone = { textDecoration: 'none' };
const strObjLocal = '{"drinks": {}, "meals": {}}';

function DrinksProgress() {
  const { id } = useParams();
  const { fetchData, fetchLoading } = useFetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const [objChks, setObjChks] = useState({});

  useEffect(() => {
    const local = JSON
      .parse((localStorage
        .getItem('inProgressRecipes') || strObjLocal));
    const objLocal = Object.values((local.drinks[id] || [])).reduce((a, b) => ({
      ...a,
      [b]: true,
    }), {});
    // console.log(objLocal, local);
    setObjChks(objLocal);
  }, [id]);

  const hendleCheckbox = ({ target }) => {
    const local = JSON
      .parse((localStorage
        .getItem('inProgressRecipes') || strObjLocal));
    const { drinks } = local;
    const { name, checked } = target;
    if (checked) {
      setObjChks({ ...objChks, [name]: true });
      drinks[id] = [...(drinks[id] || []), name];
    } else {
      setObjChks({ ...objChks, [name]: false });
      drinks[id] = [...drinks[id].filter((el) => el !== name)];
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify({ ...local, drinks }));
  };

  // console.log(fetchData?.meals[0]);
  if (fetchLoading) { return <p>Carregando...</p>; }
  return (
    <div>
      <img
        src={ fetchData?.drinks[0]?.strDrinkThumb }
        alt=""
        data-testid="recipe-photo"
      />
      <h4 data-testid="recipe-title">{fetchData?.drinks[0]?.strDrink}</h4>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Fav</button>
      <p data-testid="recipe-category">{fetchData?.drinks[0]?.strCategory}</p>
      <p data-testid="instructions">{fetchData?.drinks[0]?.strInstructions}</p>
      <div className="checkboxes" style={ { display: 'flex', flexDirection: 'column' } }>
        { Object.entries(fetchData?.drinks[0])
          .filter(([chv, val]) => chv.includes('strIngredient') && val)
          .map(([, val]) => val)
          .map((e, i) => (
            <label
              key={ i }
              data-testid={ `${i}-ingredient-step` }
              htmlFor={ `ingredient-${i}` }
              style={ (objChks[`${e}-ingredient-${i}`]) ? objStyle : objNone }
            >
              <input
                type="checkbox"
                id={ `ingredient-${i}` }
                name={ `${e}-ingredient-${i}` }
                onChange={ hendleCheckbox }
                checked={ (objChks[`${e}-ingredient-${i}`] || false) }
              />
              {e}
            </label>
          )) }

      </div>
      <button data-testid="finish-recipe-btn" type="button">Finalizar</button>
    </div>
  );
}
export default DrinksProgress;
