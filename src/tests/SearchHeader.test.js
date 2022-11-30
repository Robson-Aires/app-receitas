import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../Helpers/renderWithRouter';

const testidIngredient = 'ingredient-search-radio';
const testidName = 'name-search-radio';
const testidFirstLetter = 'first-letter-search-radio';
const testidBtnSearchTop = 'search-top-btn';
const testidBtnSearch = 'exec-search-btn';
const testidInputSearch = 'search-input';

describe('Testa Search Header', () => {
  it('Verifica inputs na page meals', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/meals'); });

    const inputIngredient = screen.getByTestId(testidIngredient);
    expect(inputIngredient).toBeInTheDocument();

    const inputName = screen.getByTestId(testidName);
    expect(inputName).toBeInTheDocument();

    const inputFirstLetter = screen.getByTestId(testidFirstLetter);
    expect(inputFirstLetter).toBeInTheDocument();

    const btnSearch = screen.getByTestId(testidBtnSearch);
    expect(btnSearch).toBeInTheDocument();

    const btnSearchTop = screen.getByTestId(testidBtnSearchTop);
    expect(btnSearchTop).toBeInTheDocument();

    userEvent.click(btnSearchTop);

    const inputSearch = screen.getByTestId(testidInputSearch);
    expect(inputSearch).toBeInTheDocument();

    userEvent.type(inputSearch, 'rice');
    userEvent.click(inputIngredient);
    userEvent.click(btnSearch);
    await new Promise((r) => { setTimeout(r, 2000); });
  });
  it('Verifica inputs na page meals com outros filtros especificados', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/meals'); });

    const inputIngredient = screen.getByTestId(testidIngredient);
    expect(inputIngredient).toBeInTheDocument();

    const inputName = screen.getByTestId(testidName);
    expect(inputName).toBeInTheDocument();

    const inputFirstLetter = screen.getByTestId(testidFirstLetter);
    expect(inputFirstLetter).toBeInTheDocument();

    const btnSearch = screen.getByTestId(testidBtnSearch);
    expect(btnSearch).toBeInTheDocument();

    const btnSearchTop = screen.getByTestId(testidBtnSearchTop);
    expect(btnSearchTop).toBeInTheDocument();

    userEvent.click(btnSearchTop);

    const inputSearch = screen.getByTestId(testidInputSearch);
    expect(inputSearch).toBeInTheDocument();

    userEvent.type(inputSearch, 'orange');
    userEvent.click(inputName);
    userEvent.click(btnSearch);
    await new Promise((r) => { setTimeout(r, 2000); });
  });
  it('Verifica inputs meals e outros filtros', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/meals'); });

    const inputIngredient = screen.getByTestId(testidIngredient);
    expect(inputIngredient).toBeInTheDocument();

    const inputName = screen.getByTestId(testidName);
    expect(inputName).toBeInTheDocument();

    const inputFirstLetter = screen.getByTestId(testidFirstLetter);
    expect(inputFirstLetter).toBeInTheDocument();

    const btnSearch = screen.getByTestId(testidBtnSearch);
    expect(btnSearch).toBeInTheDocument();

    const btnSearchTop = screen.getByTestId(testidBtnSearchTop);
    expect(btnSearchTop).toBeInTheDocument();

    userEvent.click(btnSearchTop);

    const inputSearch = screen.getByTestId(testidInputSearch);
    expect(inputSearch).toBeInTheDocument();

    userEvent.type(inputSearch, 'o');
    userEvent.click(inputFirstLetter);
    userEvent.click(btnSearch);
    await new Promise((r) => { setTimeout(r, 2000); });
  });
  it('Verifica inputs meals e outros filtros especificados', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/meals'); });

    const inputIngredient = screen.getByTestId(testidIngredient);
    expect(inputIngredient).toBeInTheDocument();

    const inputName = screen.getByTestId(testidName);
    expect(inputName).toBeInTheDocument();

    const inputFirstLetter = screen.getByTestId(testidFirstLetter);
    expect(inputFirstLetter).toBeInTheDocument();

    const btnSearch = screen.getByTestId(testidBtnSearch);
    expect(btnSearch).toBeInTheDocument();

    const btnSearchTop = screen.getByTestId(testidBtnSearchTop);
    expect(btnSearchTop).toBeInTheDocument();

    userEvent.click(btnSearchTop);

    const inputSearch = screen.getByTestId(testidInputSearch);
    expect(inputSearch).toBeInTheDocument();

    userEvent.type(inputSearch, 'oo');
    userEvent.click(inputFirstLetter);
    userEvent.click(btnSearch);
    await new Promise((r) => { setTimeout(r, 2000); });
  });
});

describe('Testa Search Header', () => {
  it('Verifica inputs na page drinks', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/drinks'); });

    const inputIngredient = screen.getByTestId(testidIngredient);
    expect(inputIngredient).toBeInTheDocument();

    const inputName = screen.getByTestId(testidName);
    expect(inputName).toBeInTheDocument();

    const inputFirstLetter = screen.getByTestId(testidFirstLetter);
    expect(inputFirstLetter).toBeInTheDocument();

    const btnSearch = screen.getByTestId(testidBtnSearch);
    expect(btnSearch).toBeInTheDocument();

    const btnSearchTop = screen.getByTestId(testidBtnSearchTop);
    expect(btnSearchTop).toBeInTheDocument();

    userEvent.click(btnSearchTop);

    const inputSearch = screen.getByTestId(testidInputSearch);
    expect(inputSearch).toBeInTheDocument();

    userEvent.type(inputSearch, 'lime');
    userEvent.click(inputIngredient);
    userEvent.click(btnSearch);
    await new Promise((r) => { setTimeout(r, 2000); });
  });
  it('Verifica inputs na page drinks e outros filtros especificados', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/drinks'); });

    const inputIngredient = screen.getByTestId(testidIngredient);
    expect(inputIngredient).toBeInTheDocument();

    const inputName = screen.getByTestId(testidName);
    expect(inputName).toBeInTheDocument();

    const inputFirstLetter = screen.getByTestId(testidFirstLetter);
    expect(inputFirstLetter).toBeInTheDocument();

    const btnSearch = screen.getByTestId(testidBtnSearch);
    expect(btnSearch).toBeInTheDocument();

    const btnSearchTop = screen.getByTestId(testidBtnSearchTop);
    expect(btnSearchTop).toBeInTheDocument();

    userEvent.click(btnSearchTop);

    const inputSearch = screen.getByTestId(testidInputSearch);
    expect(inputSearch).toBeInTheDocument();

    userEvent.type(inputSearch, 'orange');
    userEvent.click(inputName);
    userEvent.click(btnSearch);
    await new Promise((r) => { setTimeout(r, 2000); });
  });
  it('Verifica inputs na page drinks e outros filtros especificados', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/drinks'); });

    const inputIngredient = screen.getByTestId(testidIngredient);
    expect(inputIngredient).toBeInTheDocument();

    const inputName = screen.getByTestId(testidName);
    expect(inputName).toBeInTheDocument();

    const inputFirstLetter = screen.getByTestId(testidFirstLetter);
    expect(inputFirstLetter).toBeInTheDocument();

    const btnSearch = screen.getByTestId(testidBtnSearch);
    expect(btnSearch).toBeInTheDocument();

    const btnSearchTop = screen.getByTestId(testidBtnSearchTop);
    expect(btnSearchTop).toBeInTheDocument();

    userEvent.click(btnSearchTop);

    const inputSearch = screen.getByTestId(testidInputSearch);
    expect(inputSearch).toBeInTheDocument();

    userEvent.type(inputSearch, 'o');
    userEvent.click(inputFirstLetter);
    userEvent.click(btnSearch);
    await new Promise((r) => { setTimeout(r, 2000); });
  });
  it('Verifica inputs na page drinks e outros filtros', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/drinks'); });

    const inputIngredient = screen.getByTestId(testidIngredient);
    expect(inputIngredient).toBeInTheDocument();

    const inputName = screen.getByTestId(testidName);
    expect(inputName).toBeInTheDocument();

    const inputFirstLetter = screen.getByTestId(testidFirstLetter);
    expect(inputFirstLetter).toBeInTheDocument();

    const btnSearch = screen.getByTestId(testidBtnSearch);
    expect(btnSearch).toBeInTheDocument();

    const btnSearchTop = screen.getByTestId('search-top-btn');
    expect(btnSearchTop).toBeInTheDocument();

    userEvent.click(btnSearchTop);

    const inputSearch = screen.getByTestId(testidInputSearch);
    expect(inputSearch).toBeInTheDocument();

    userEvent.type(inputSearch, 'oo');
    userEvent.click(inputFirstLetter);
    userEvent.click(btnSearch);
    await new Promise((r) => { setTimeout(r, 2000); });
  });

  /* describe('Testa Search Header', () => {
    it('Verifica funcionamento da busca por uma comida', async () => {
      const { history } = renderWithRouter(<App />);

      act(() => { history.push('/meals'); });

      const inputName =
    });
  }); */
});
