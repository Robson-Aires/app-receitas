import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../Helpers/renderWithRouter';

// const testidName = 'name-search-radio';
// const testidBtnSearchTop = 'search-top-btn';
// const testidBtnSearch = 'exec-search-btn';

describe('Testa o butao de favorite da pagina RecipeDetails', () => {
  beforeEach(() => { jest.resetAllMocks(); });
  afterEach(() => { jest.resetAllMocks(); });
  it('Verifica o botao de favoritar', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('meals/52977'); });

    const btnSearchTop = await screen.findByTestId('favorite-btn');
    expect(btnSearchTop).toBeInTheDocument();
    userEvent.click(btnSearchTop);
    userEvent.click(btnSearchTop);
  });
//   it('Verifica o botao de compartilhar', async () => {
//     const { history } = renderWithRouter(<App />);

//     act(() => { history.push('meals/52977'); });

//     const btncompartilhar = await screen.findByTestId('share-btn');
//     expect(btncompartilhar).toBeInTheDocument();
//     act(async () => { userEvent.click(btncompartilhar); });
//   });
});
