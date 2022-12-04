import React, { useState, useEffect } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const objStyle = { textDecoration: 'line-through solid rgb(0, 0, 0)' };
const objNone = { textDecoration: 'none' };
const strObjLocal = '{"drinks": {}, "meals": {}}';

const copy = require('clipboard-copy');

const MAX_INGRED = 20;

function RecipeInProgress() {
  const { id } = useParams();
  const { fetchData, fetchLoading } = useFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const [objChks, setObjChks] = useState({});
  const [message, setMessage] = useState(false);
  const history = useHistory();
  const [localFavorite, setLocalFavorite] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [numIngred, setNumIngred] = useState(MAX_INGRED);

  useEffect(() => {
    const local = JSON
      .parse((localStorage
        .getItem('inProgressRecipes') || strObjLocal));
    const objLocal = Object.values((local.meals[id] || [])).reduce((a, b) => ({
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

  useEffect(() => {
    if (!Array.isArray(fetchData) && fetchData) {
      const num = Object.entries(fetchData?.meals[0])
        .filter(([chv, val]) => chv.includes('strIngredient') && val).length;
      setNumIngred(num);
    }
    console.log(fetchData);
  }, [fetchData]);

  useEffect(() => {
    if (Object.values(objChks).filter((el) => el).length === numIngred) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [objChks, numIngred]);

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
    const { meals } = local;
    const { name, checked } = target;
    if (checked) {
      setObjChks({ ...objChks, [name]: true });
      meals[id] = [...(meals[id] || []), name];
    } else {
      setObjChks({ ...objChks, [name]: false });
      meals[id] = [...meals[id].filter((el) => el !== name)];
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify({ ...local, meals }));
  };

  const handleFavorite = () => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    if (local.find((e) => e.id === id)) {
      const arr = local.filter((e) => e.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(arr));
      setLocalFavorite(false);
    } else {
      const obj = {
        id: fetchData?.meals[0]?.idMeal,
        type: 'meal',
        nationality: fetchData?.meals[0]?.strArea,
        category: fetchData?.meals[0]?.strCategory,
        alcoholicOrNot: '',
        name: fetchData?.meals[0]?.strMeal,
        image: fetchData?.meals[0]?.strMealThumb,
      };
      // console.log(dataMeals, local, obj);
      localStorage.setItem('favoriteRecipes', JSON.stringify([...local, obj]));
      setLocalFavorite(true);
    }
  };

  const handleFinish = () => {
    const local = JSON.parse(localStorage.getItem('doneRecipes ') || '[]');
    const obj = {
      id: fetchData?.meals[0]?.idMeal,
      nationality: fetchData?.meals[0]?.strArea,
      name: fetchData?.meals[0]?.strMeal,
      category: fetchData?.meals[0]?.strCategory,
      image: fetchData?.meals[0]?.strMealThumb,
      tags: (fetchData?.meals[0]?.strTags?.split(',') || []),
      alcoholicOrNot: '',
      type: 'meal',
      doneDate: new Date().toISOString(),
    };
    console.log(obj, 'antes de salvar no local', local);
    localStorage.setItem('doneRecipes', JSON.stringify([...local, obj]));
    history.push('/done-recipes');
  };

  // console.log(fetchData);
  if (fetchLoading) { return <p>Carregando...</p>; }
  return (
    <div>
      <img src={ fetchData?.meals[0]?.strMealThumb } alt="" data-testid="recipe-photo" />
      <h4 data-testid="recipe-title">{fetchData?.meals[0]?.strMeal}</h4>
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
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ isDisabled }
        onClick={ handleFinish }
      >
        Finalizar

      </button>
    </div>
  );
}

export default RecipeInProgress;
