import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import Recipes from '../pages/Recipes';

describe('Testa o componente Footer', () => {
  test('Testa se tudo é renderizado como esperado', () => {
    renderWithRouter(<Recipes />);
    expect(screen.getByTestId('meals-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
  });
  test('Testa se o botão meals direcionapara o local certo', () => {
    const { history } = renderWithRouter(<Recipes />);
    const meals = screen.getByTestId('meals-bottom-btn');
    userEvent.click(meals);
    expect(history.location.pathname).toBe('/meals');
  });

  test('Testa se o botão drinks direcionapara o local certo', () => {
    const { history } = renderWithRouter(<Recipes />);
    const drinks = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinks);
    expect(history.location.pathname).toBe('/drinks');
  });
});
