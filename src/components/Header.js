import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import recipesContext from '../context/recipesContext';

function Header({ title, showIcon = true }) {
  const [showInput, setShowInput] = useState(false);
  const { inputSearch, setInputSearch } = useContext(recipesContext);

  return (
    <div>
      <header>
        <p data-testid="page-title">{title}</p>
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt=""
          />
        </Link>
        {
          showIcon
        && (
          <button type="button" onClick={ () => setShowInput(!showInput) }>
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt=""
            />
          </button>)
        }
        { showInput && <input
          placeholder="Buscar"
          type="text"
          data-testid="search-input"
          value={ inputSearch }
          onChange={ (e) => setInputSearch(e.target.value) }
        />}

      </header>
      <SearchBar />
    </div>
  );
}

Header.propTypes = {}.isRequired;

export default Header;
