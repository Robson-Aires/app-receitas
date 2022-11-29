import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Recipes from '../pages/Recipes';

describe('Testa o componente Footer', () => {
  test('Testa se tudo é renderizado como esperado', () => {
    render(<Recipes />);
    expect(screen.getByTestId('meals-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
  });
  test('Testa se o botão meals direcionapara o local certo', () => {
    render(
      <BrowserRouter>
        <Recipes />
      </BrowserRouter>,
    );
    const meals = screen.getByTestId('meals-bottom-btn');
    userEvent.click(meals);
  });

  test('Testa se o botão drinks direcionapara o local certo', () => {
    render(
      <BrowserRouter>
        <Recipes />
      </BrowserRouter>,
    );
    const drinks = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinks);
  });
});
