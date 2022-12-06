import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import App from '../App';
import renderWithRouter from '../Helpers/renderWithRouter';

// const copy = require('clipboard-copy');

const objDone = [{
  id: '52977',
  nationality: 'Turkish',
  name: 'Corba',
  category: 'Side',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  tags: ['Soup'],
  alcoholicOrNot: '',
  type: 'meal',
  doneDate: '2022-12-04T03:21:06.687Z' },
{
  id: '178319',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Aquamarine',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  doneDate: '23/06/2020',
  tags: [],
},
];

const btnAll = 'filter-by-all-btn';
const btnMeals = 'filter-by-meal-btn';
const btnDrinks = 'filter-by-drink-btn';
const btnShare = '0-horizontal-share-btn';
const imag = '0-horizontal-image';
const imag2 = '1-horizontal-image';

const rota = '/done-recipes';

jest.mock('clipboard-copy');

beforeEach(() => {
  jest.resetAllMocks();
  localStorage.setItem('doneRecipes', JSON.stringify(objDone));
  // jest.mock('clipboard-copy');
});
afterEach(() => { jest.resetAllMocks(); });
describe('Testa Done recipes', () => {
  it('Clica em compartilhar', async () => {
    // copy.mockReturnValueOnce(() => null);
    // window.document.copy = jest.fn();
    copy.mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);

    act(() => { history.push(rota); });

    const goBtnShare = screen.getByTestId(btnShare);
    expect(goBtnShare).toBeInTheDocument();

    userEvent.click(goBtnShare);

    // const inputName = screen.getByTestId(testidName);
    // expect(inputName).toBeInTheDocument();

    // const btnSearch = screen.getByTestId(testidBtnSearch);
    // expect(btnSearch).toBeInTheDocument();

    // userEvent.type(inputName, 'lime');
    // jest.spyOn(global, 'fetch'); global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue({ meals: null }) });
    // userEvent.click(btnSearch);
    // await new Promise((r) => { setTimeout(r, 1000); });
    // jest.clearAllMocks();
  });
  it('Clica em filtro meals', async () => {
    // copy.mockReturnValueOnce(() => null);
    // window.document.copy = jest.fn();
    const { history } = renderWithRouter(<App />);

    act(() => { history.push(rota); });

    const goBtnShare = screen.getByTestId(btnMeals);
    expect(goBtnShare).toBeInTheDocument();

    userEvent.click(goBtnShare);

    // const inputName = screen.getByTestId(testidName);
    // expect(inputName).toBeInTheDocument();

    // const btnSearch = screen.getByTestId(testidBtnSearch);
    // expect(btnSearch).toBeInTheDocument();

    // userEvent.type(inputName, 'lime');
    // jest.spyOn(global, 'fetch'); global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue({ meals: null }) });
    // userEvent.click(btnSearch);
    await new Promise((r) => { setTimeout(r, 1000); });
    jest.clearAllMocks();
  });
  it('Clica em drinks', async () => {
    // copy.mockReturnValueOnce(() => null);
    // window.document.copy = jest.fn();
    const { history } = renderWithRouter(<App />);

    act(() => { history.push(rota); });

    const goBtnShare = screen.getByTestId(btnDrinks);
    expect(goBtnShare).toBeInTheDocument();

    userEvent.click(goBtnShare);

    // const inputName = screen.getByTestId(testidName);
    // expect(inputName).toBeInTheDocument();

    // const btnSearch = screen.getByTestId(testidBtnSearch);
    // expect(btnSearch).toBeInTheDocument();

    // userEvent.type(inputName, 'lime');
    // jest.spyOn(global, 'fetch'); global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue({ meals: null }) });
    // userEvent.click(btnSearch);
    await new Promise((r) => { setTimeout(r, 1000); });
    jest.clearAllMocks();
  });
  it('Clica em filtro all', async () => {
    // copy.mockReturnValueOnce(() => null);
    // window.document.copy = jest.fn();
    copy.mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);

    act(() => { history.push(rota); });

    const goBtnShare = screen.getByTestId(btnAll);
    expect(goBtnShare).toBeInTheDocument();

    userEvent.click(goBtnShare);

    const inputName = screen.getByTestId(imag);
    expect(inputName).toBeInTheDocument();
    userEvent.click(inputName);

    await new Promise((r) => { setTimeout(r, 1000); });
    jest.clearAllMocks();
  });
  it('Clica em imagem drink', async () => {
    // copy.mockReturnValueOnce(() => null);
    // window.document.copy = jest.fn();
    const { history } = renderWithRouter(<App />);

    act(() => { history.push(rota); });

    const inputName = screen.getByTestId(imag2);
    expect(inputName).toBeInTheDocument();
    userEvent.click(inputName);

    console.log(history.location.pathname);
    await new Promise((r) => { setTimeout(r, 1000); });
    jest.clearAllMocks();
  });
});

describe('Testa LocalStorage vazio', () => {
  it('LocalStorage vazio', () => {
    localStorage.clear();

    const { history } = renderWithRouter(<App />);

    act(() => { history.push(rota); });

    const goBtnShare = screen.getByTestId(btnAll);
    expect(goBtnShare).toBeInTheDocument();

    userEvent.click(goBtnShare);

    jest.clearAllMocks();
  });
});
