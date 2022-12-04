import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

import Header from '../components/Header';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [done, setDone] = useState([]);
  const [message, setMessage] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const local = JSON.parse((localStorage.getItem('doneRecipes') || '[]'));
    setDone(local);
  }, []);

  const handleShare = (recipe) => {
    setMessage(true);
    const copied = `http://localhost:3000/${recipe.type}s/${recipe.id}`;
    copy(copied);
    console.log(copied);
  };

  const goFilter = (str) => {
    const local = JSON.parse((localStorage.getItem('doneRecipes') || '[]'));
    const arr = local.filter((el) => el.type.includes(str));
    setDone(arr);
  };

  return (
    <div>
      <Header title="Done Recipes" showIcon={ false } />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => goFilter('') }
      >
        All

      </button>
      <button
        data-testid="filter-by-meal-btn"
        type="button"
        onClick={ () => goFilter('meal') }
      >
        Meals

      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => goFilter('drink') }
      >
        Drinks

      </button>
      <div className="card-container">
        {
          done.map((el, i) => (
            <div className="card" key={ el.id }>

              <input
                type="image"
                src={ el.image }
                alt=""
                data-testid={ `${i}-horizontal-image` }
                onClick={ () => history.push(`/${el.type}s/${el.id}`) }
              />

              <Link to={ `/${el.type}s/${el.id}` }>
                <p data-testid={ `${i}-horizontal-name` }>{el.name}</p>
              </Link>
              <p
                data-testid={ `${i}-horizontal-top-text` }
              >
                {(el.type === 'meal')
                  ? `${el.nationality} - ${el.category}` : el.alcoholicOrNot }

              </p>
              <p data-testid={ `${i}-horizontal-done-date` }>{el.doneDate}</p>
              {message && <p>Link copied!</p>}
              <button
                type="button"
                onClick={ () => handleShare(el) }
              >
                <img
                  src={ shareIcon }
                  alt="compartilhar"
                  data-testid={ `${i}-horizontal-share-btn` }
                />
              </button>
              {el.tags.map((tag) => (
                <p key={ tag } data-testid={ `${i}-${tag}-horizontal-tag` }>{tag}</p>
              ))}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default DoneRecipes;
