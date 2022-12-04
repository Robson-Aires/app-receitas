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
});
// teest//
