import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../Helpers/renderWithRouter';

describe('Testa Search Header Para disparar o alert', () => {
  beforeEach(() => { jest.resetAllMocks(); });
  afterEach(() => { jest.resetAllMocks(); });
  it('Verifica o botão Done Recipes', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/profile'); });

    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    expect(btnDoneRecipes).toBeInTheDocument();

    userEvent.click(btnDoneRecipes);

    await new Promise((r) => { setTimeout(r, 1000); });
    jest.clearAllMocks();
  });
  it('Verifica o botão Favorite Recipes', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/profile'); });

    const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    expect(btnFavoriteRecipes).toBeInTheDocument();

    userEvent.click(btnFavoriteRecipes);

    await new Promise((r) => { setTimeout(r, 1000); });
    jest.clearAllMocks();
  });
  it('Verifica o botão Logout', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/profile'); });

    const btnLogout = screen.getByTestId('profile-logout-btn');
    expect(btnLogout).toBeInTheDocument();

    userEvent.click(btnLogout);

    await new Promise((r) => { setTimeout(r, 1000); });
    jest.clearAllMocks();
  });
});
