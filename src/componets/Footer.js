import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <button type="button" onClick={ () => history.push('/meals') }>
        <img
          src={ mealIcon }
          alt="drik"
          data-testid="meals-bottom-btn"
        />

      </button>
      <button type="button" onClick={ () => history.push('/drinks') }>
        <img
          src={ drinkIcon }
          alt="drik"
          data-testid="drinks-bottom-btn"
        />
      </button>
    </footer>

  );
}
