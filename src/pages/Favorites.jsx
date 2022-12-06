import { React, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import recipesContext from '../context/recipesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function Favorites() {
  // const history = useHistory();
  const { done } = useContext(recipesContext);
  console.log(done);
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
          done.map((el, i) => (
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
      {
        favorite.map((recipe, i) => (
          <div key={ i }>
            <p>{recipe.name}</p>
            <p>
              {
                `
              ${recipe.nationality}
              -
              ${recipe.category}`
              }
            </p>
            <input type="image" src={ recipe.image } alt="foto da receita" />
            <button type="button">compartilhar</button>
            <button
              type="button"
              // onClick={ handleFavorite }
            >
              <img
                data-testid="favorite-btn"
                src={ blackHeartIcon }
                alt=""
              />
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default Favorites;
