import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import App from '../App';

const ID_EMAIL = 'email-input';
const ID_SENHA = 'password-input';
const ID_BUTTON = 'login-submit-btn';
const VALIDA_EMAIL = 'teste@email.com';
const VALIDA_SENHA = '1234567';

describe('testando a tela de Login ', () => {
  test('Teste se os inputs email e senha e o botao entrar se aparece na tela', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    const senhaInput = screen.getByTestId(ID_SENHA);
    expect(senhaInput).toBeInTheDocument();

    const buttonInput = screen.getByTestId(ID_BUTTON);
    expect(buttonInput).toBeInTheDocument();
  });
  test('testar se e possivel digitar o email e a senha', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(ID_EMAIL);
    userEvent.type(inputEmail, VALIDA_EMAIL);
    expect(inputEmail).toHaveValue(VALIDA_EMAIL);

    const senhaInput = screen.getByTestId(ID_SENHA);
    userEvent.type(senhaInput, '1234567');
    const inputButton = screen.getByTestId(ID_BUTTON);
    userEvent.click(inputButton);
  });
  test(`Teste se formulário só fica válido e o botão habilitado após um email válido e
      uma senha de mais de 7 caracteres serem preenchidos no inputs`, () => {
    renderWithRouter(<App />);
    const inputButton = screen.getByTestId(ID_BUTTON);
    expect(inputButton).toBeInTheDocument();

    const inputEmail = screen.getByTestId(ID_EMAIL);
    userEvent.type(inputEmail, 'incorrectEmail');

    const inputsenha = screen.getByTestId(ID_SENHA);
    userEvent.type(inputsenha, '123');
    expect(inputButton).toBeDisabled();
  });
  test('teste se a rota muda para a tela principal de comidas apos validar email e senha', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(ID_EMAIL);
    userEvent.type(inputEmail, VALIDA_EMAIL);

    const inputsenha = screen.getByTestId(ID_SENHA);
    userEvent.type(inputsenha, VALIDA_SENHA);

    const inputButton = screen.getByTestId(ID_BUTTON);
    userEvent.click(inputButton, ID_BUTTON);

    expect(history.location.pathname).toBe('/meals');
  });
});
