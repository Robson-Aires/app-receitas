import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../Helpers/renderWithRouter';

describe('Testa a tela de RecipeInprogress, e os checkboxs', () => {
  it('verifica os inputs e butoes', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/meals/52977'); });

    const btnSearchTop = await screen.findByTestId('start-recipe-btn');
    expect(btnSearchTop).toBeInTheDocument();

    userEvent.click(btnSearchTop);

    const inputName = await screen.findByTestId('1-ingredient-step');
    expect(inputName).toBeInTheDocument();
    userEvent.click(inputName);
    userEvent.click(inputName);

    // inputName = await screen.findByTestId('1-ingredient-step');
    // expect(inputName).toBeChecked('checked');
  });
  it('Verifica o botao de favoritar', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('meals/52977/in-progress'); });

    const btnSearchTop = await screen.findByTestId('favorite-btn');
    expect(btnSearchTop).toBeInTheDocument();
    userEvent.click(btnSearchTop);
    userEvent.click(btnSearchTop);
  });
  it('testar os id dos checkbox', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('meals/52977/in-progress'); });

    const numberTreze = 13;
    for (let i = 0; i < numberTreze;
      i += 1) {
      const btnId2 = await screen.findByTestId(`${i}-ingredient-step`);
      userEvent.click(btnId2);
    }
    const btn = screen.getByTestId('finish-recipe-btn');
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
  });
});
