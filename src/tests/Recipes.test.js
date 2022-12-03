import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../Helpers/renderWithRouter';

const IDPORK = 'Pork-category-filter';

const mockMeals = {
  meals: [
    { idMeal: '52977', strMeal: 'Corba', strCategory: 'Side', strMealThumb: 'https://www.themealdb.com//images//media//meals//58oia61564916529.jpg' },
    { idMeal: '53060', strMeal: 'Burek', strCategory: 'Side', strMealThumb: 'https://www.themealdb.com//images//media//meals//tkxquw1628771028.jpg' },
    { idMeal: '53065', strMeal: 'Sushi', strCategory: 'Seafood', strMealThumb: 'https://www.themealdb.com//images//media//meals//g046bb1663960946.jpg' },
    { idMeal: '53006', strMeal: 'Moussaka', strCategory: 'Beef', strMealThumb: 'https://www.themealdb.com//images//media//meals//ctg8jd1585563097.jpg' },
    { idMeal: '52926', strMeal: 'Tourtiere', strCategory: 'Pork', strMealThumb: 'https://www.themealdb.com//images//media//meals//ytpstt1511814614.jpg' },
  ],
};
const mockButtons = {
  meals: [
    { strCategory: 'Beef' },
    { strCategory: 'Pork' },
    { strCategory: 'Seafood' },
    { strCategory: 'Side' },
  ],
};
const mockResultButton = {
  meals: [
    { idMeal: '52926', strMeal: 'Tourtiere', strCategory: 'Pork', strMealThumb: 'https://www.themealdb.com//images//media//meals//ytpstt1511814614.jpg' },
  ],
};

describe('Testa os botões de filtro', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(mockMeals)
        .mockResolvedValueOnce(mockButtons)
        .mockResolvedValueOnce(mockMeals)
        .mockResolvedValueOnce(mockResultButton),

    });
  });

  it('Verifica a funcionalidade dos botões', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    const beef = await screen.findByTestId('Beef-category-filter');
    const Pork = await screen.findByTestId(IDPORK);
    const Seafood = await screen.findByTestId('Seafood-category-filter');
    const Side = await screen.findByTestId('Side-category-filter');

    expect(beef).toBeInTheDocument();
    expect(Pork).toBeInTheDocument();
    expect(Seafood).toBeInTheDocument();
    expect(Side).toBeInTheDocument();

    expect(await screen.findAllByAltText('asd')).toHaveLength(5);

    userEvent.click(Pork);
    expect(await screen.findAllByAltText('asd')).toHaveLength(1);
    const all = await screen.findByTestId('All-category-filter');
    userEvent.click(all);
    expect(await screen.findAllByAltText('asd')).toHaveLength(5);
  });
  it('Verifica se ao clicar em um card é redirecinadi para a página de detalhes', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    expect(history.location.pathname).toBe('/meals');
    userEvent.click(await screen.findByTestId('0-card-img'));
    expect(history.location.pathname).toBe('/meals/52977');
  });
  it('verificar botao toggle', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });
    let Pork = await screen.findByTestId(IDPORK);
    userEvent.click(Pork);
    expect(await screen.findAllByAltText('asd')).toHaveLength(1);
    Pork = await screen.findByTestId(IDPORK);
    userEvent.click(Pork);
    expect(await screen.findAllByAltText('asd')).toHaveLength(5);
  });
});
