import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../Helpers/renderWithRouter';

const Rotas = '/meals';

describe('Testa se ta pegando o butão', () => {
  it('Verifica se ao clicar na imagem aparace o butao recipe start', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push(Rotas); });

    const btnImg = await screen.findByTestId('0-card-img');
    expect(btnImg).toBeInTheDocument();
    userEvent.click(btnImg);

    const btntest = await screen.findByTestId('start-recipe-btn');
    expect(btntest).toBeInTheDocument();
    userEvent.click(btntest);
    expect(history.location.pathname).toBe('/meals/52977/in-progress');
    // const btnSearch = screen.getByTestId();
    // expect(btnSearch).toBeInTheDocument();

    // userEvent.type(inputName, 'lime');
    // jest.spyOn(global, 'fetch'); global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue({ meals: null }) });
    // userEvent.click(btnSearch);
    // await new Promise((r) => { setTimeout(r, 1000); });
    // jest.clearAllMocks();
  });
});
