import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../Helpers/renderWithRouter';

const testidName = 'name-search-radio';
const testidBtnSearchTop = 'search-top-btn';
const testidBtnSearch = 'exec-search-btn';

describe('Testa Search Header Para disparar o alert', () => {
  beforeEach(() => { jest.resetAllMocks(); });
  afterEach(() => { jest.resetAllMocks(); });
  it('Verifica o disparo do alert', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/meals'); });

    const btnSearchTop = screen.getByTestId(testidBtnSearchTop);
    expect(btnSearchTop).toBeInTheDocument();

    userEvent.click(btnSearchTop);

    const inputName = screen.getByTestId(testidName);
    expect(inputName).toBeInTheDocument();

    const btnSearch = screen.getByTestId(testidBtnSearch);
    expect(btnSearch).toBeInTheDocument();

    userEvent.type(inputName, 'lime');
    jest.spyOn(global, 'fetch'); global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue({ meals: null }) });
    userEvent.click(btnSearch);
    await new Promise((r) => { setTimeout(r, 1000); });
    jest.clearAllMocks();
  });
});
