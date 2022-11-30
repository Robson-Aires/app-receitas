import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      email: '',
      password: '',
    };
  }

  handleChangeOfName = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const NUMBER_OF_CHARACTERS = 6;
      const { email, password } = this.state;
      const regex = /\S+@\S+\.\S+/;
      if (regex.test(email) && password.length > NUMBER_OF_CHARACTERS) {
        this.setState({
          isDisabled: false,
        });
      } else {
        this.setState({
          isDisabled: true,
        });
      }
    });
  };

  handleSubmit = () => {
    const { history } = this.props;
    const { email: UserEmail } = this.state;
    localStorage.setItem('user', JSON.stringify({ email: UserEmail }));
    history.push('/meals');
  };

  render() {
    const { isDisabled, email, password } = this.state;
    return (
      <div>
        <form>
          <input
            value={ email }
            type="text"
            name="email"
            data-testid="email-input"
            onChange={ this.handleChangeOfName }
          />
          <br />
          <input
            value={ password }
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ this.handleChangeOfName }
          />
          <br />
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ isDisabled }
            onClick={ this.handleSubmit }
          >
            Enter
          </button>
        </form>
      </div>
    );
  }
}
Login.defaultProps = {
  dispatch: { push: () => {} },
};
Login.propTypes = {
  dispatch: PropTypes.shape({
    push: PropTypes.func,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
