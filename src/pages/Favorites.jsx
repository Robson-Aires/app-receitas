import { React, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function Favorites() {
  const history = useHistory();
  const [favorite, setFavorite] = useState([]);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    const local = JSON.parse((localStorage.getItem('favoriteRecipes')) || '[]');
    setFavorite(local);
  }, []);

  const handleShare = (parameter1, parameter2) => {
    setMessage(true);
    const copied = `${window.location.origin}/${parameter1}s/${parameter2}`;
    console.log(`${history.location.pathname}`);
    copy(copied);
  };

  const deleteButton = (value) => {
    const result = favorite.filter((element) => value !== element.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(result));
    setFavorite(result);
  };

  const goFilter = (str) => {
    const local = JSON.parse((localStorage.getItem('favoriteRecipes') || '[]'));
    const arr = local.filter((el) => el.type.includes(str));
    setFavorite(arr);
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
          favorite.map((el, i) => (
            <div className="card" key={ el.id }>
              <input
                data-testid={ `${i}-horizontal-image` }
                type="button"
                onClick={ () => history
                  .push(`/${el.type}s/${el.id}`) }
                src={ el.image }
                alt="abc"
              />
              {/* <img src={ el.image } alt="abc" data-testid={ `${i}-horizontal-image` } /> */}

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
                onClick={ () => handleShare(el.type, el.id) }
              >
                <img
                  src={ shareIcon }
                  alt="compartilhar"
                  data-testid={ `${i}-horizontal-share-btn` }
                />
              </button>
              <button
                type="button"
                onClick={ () => deleteButton(el.id) }
              >
                <img
                  data-testid={ `${i}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt=""
                />

              </button>
            </div>
          ))
        }

      </div>

    </div>
  );
}

export default Favorites;
