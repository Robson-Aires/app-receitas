import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../Helpers/renderWithRouter';

describe('Teste o app', () => {
  test('Farewell, front-end', () => {
    // Este arquivo pode ser modificado ou deletado sem problemas
    // render(<App />);
    renderWithRouter(<App />);
    const linkElement = screen.getByRole('button');
    expect(linkElement).toBeInTheDocument();
  });
});
// iniciando//
