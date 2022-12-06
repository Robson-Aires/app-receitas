import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function Favorites() {
  // const history = useHistory();
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    const local = JSON.parse((localStorage.getItem('favoriteRecipes')) || '[]');
    setFavorite(local);
  }, []);

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

              <img src={ el.image } alt="abc" data-testid={ `${i}-horizontal-image` } />

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
              {/* {message && <p>Link copied!</p>} */}
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
              <button
                type="button"
                // onClick={ handleFavorite }
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
