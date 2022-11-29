import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, showIcon = true }) {
  const [showInput, setShowInput] = useState(false);

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
        />}

      </header>
    </div>
  );
}

Header.propTypes = {}.isRequired;

export default Header;
