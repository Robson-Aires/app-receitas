import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../Helpers/renderWithRouter';

describe('Testa Header', () => {
  it('Verifica se há ícone para redirecionamento para a página Profile ', () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/meals'); });

    const iconProfile = screen.getByTestId('profile-top-btn');
    expect(iconProfile).toBeInTheDocument();
  });

  it('Verifica o funcionamento do botão de buscar', () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/meals'); });

    const btnSearch = screen.getByTestId('search-top-btn');
    expect(btnSearch).toBeInTheDocument();

    userEvent.click(btnSearch);
  });
});
