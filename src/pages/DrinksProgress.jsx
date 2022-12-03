import React, { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const objStyle = { textDecoration: 'line-through solid rgb(0, 0, 0)' };
const objNone = { textDecoration: 'none' };
const strObjLocal = '{"drinks": {}, "meals": {}}';

const copy = require('clipboard-copy');

function DrinksProgress() {
  const { id } = useParams();
  const { fetchData, fetchLoading } = useFetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const [objChks, setObjChks] = useState({});
  const [message, setMessage] = useState(false);
  const history = useHistory();
  const [localFavorite, setLocalFavorite] = useState(false);

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
    const localFav = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    // console.log(local);
    if (localFav.find((e) => e.id === id)) {
      setLocalFavorite(true);
    } else {
      setLocalFavorite(false);
    }
  }, [id]);

  const handleShare = async () => {
    setMessage(true);
    const copied = `http://localhost:3000${history.location.pathname.split('/in-')[0]}`;
    console.log(copied);
    copy(copied);
  };

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

  const handleFavorite = () => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (local.find((e) => e.id === id)) {
      const arr = local.filter((e) => e.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(arr));
      setLocalFavorite(false);
    } else {
      const obj = {
        id: fetchData?.drinks[0]?.idDrink,
        type: 'drink',
        nationality: '',
        category: fetchData?.drinks[0]?.strCategory,
        alcoholicOrNot: fetchData?.drinks[0]?.strAlcoholic,
        name: fetchData?.drinks[0]?.strDrink,
        image: fetchData?.drinks[0]?.strDrinkThumb,
      };
      // console.log(dataMeals, local, obj);
      localStorage.setItem('favoriteRecipes', JSON.stringify([...local, obj]));
      setLocalFavorite(true);
    }
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
      {message && <p>Link copied!</p>}
      <button
        data-testid="share-btn"
        type="button"
        onClick={ handleShare }
      >
        Share

      </button>
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
