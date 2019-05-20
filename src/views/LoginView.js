import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import Navbar from '../components/navbar/NavBar';
import jwt from 'jsonwebtoken';
import theme from '../theme/styledTheme';

import Spinner from '../components/Spinner';

// requests
import { loginRequest } from '../requests/ajax';

class LoginView extends React.Component {
  state = {
    nameInput: '',
    passcodeInput: '',
    loggingIn: false,
    errorMessage: '',
  };

  componentDidMount() {
    // get the fragment identifier of the URL
    const location = window.location.hash;
    if (location) {
      // separate the hash
      const hashString = location.substring(1);
      // decode jwt
      const decoded = jwt.decode(hashString);
      // update input field values
      this.setState({
        nameInput: decoded.name,
        passcodeInput: decoded.passcode,
      });
    }
  }

  handleChange = (event, input) => {
    const value = event.target.value;
    this.setState(currentState => {
      currentState[input] = value;
      return currentState;
    });
  };

  login = event => {
    event.preventDefault();
    const { nameInput, passcodeInput } = this.state;
    if (nameInput && passcodeInput) {
      this.setState({ loggingIn: true, errorMessage: '' });
      loginRequest(this.state.nameInput, this.state.passcodeInput)
        .then(res => {
          this.props.setUserAndToken(res.user, res.token);
        })
        .catch(error => {
          // display a flash message
          this.setState({
            loggingIn: false,
            errorMessage: error.response.data.message,
          });
        });
    } else {
      this.setState({ errorMessage: 'Name and passcode is required.' });
    }
  };

  render() {
    const { nameInput, passcodeInput, loggingIn, errorMessage } = this.state;
    return (
      <LoginWrapper>
        <Navbar />
        <StyledLoginView>
          <h2>Login</h2>
          <form className="container">
            <label>Name*</label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              autoFocus
              value={nameInput}
              onChange={event => this.handleChange(event, 'nameInput')}
            />
            <label>Passcode*</label>
            <input
              name="passcode"
              type="passcode"
              id="passcode"
              autoComplete="current-passcode"
              value={passcodeInput}
              onChange={event => this.handleChange(event, 'passcodeInput')}
            />
            <button type="submit" onClick={this.login} disabled={loggingIn}>
              {!loggingIn ? 'Login' : <Spinner />}
            </button>
            {errorMessage}
          </form>
        </StyledLoginView>
      </LoginWrapper>
    );
  }
}

LoginView.propTypes = {
  setUserAndToken: propTypes.func.isRequired,
};

const LoginWrapper = styled.div`
  background: ${theme.color.white};
  height: 100vh;
`;

const StyledLoginView = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  margin: 8rem auto;
  @media (max-width: 600px) {
    margin: 3rem 3rem;
  }

  h2 {
    text-align: left;
    font-size: ${theme.fontSize.xl};
    padding: 20px 0;
    color: ${theme.color.textColor};
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      font-size: ${theme.fontSize.xxs};
      color: ${theme.color.accentPurple};
      font-weight: bold;
    }

    input {
      border: none;
      border-bottom: 1px solid ${theme.color.footerText};
      margin-bottom: 20px;
      height: ${theme.input.height};
      font-size: ${theme.fontSize.xs};
      padding: 20px 0;
      border-radius: 0;
      &:focus {
        outline: none;
      }
    }
  }

  button {
    margin-top: 1rem;
    width: 100%;
    height: ${theme.button.height};
    font-size: ${theme.fontSize.s};
    border-radius: ${theme.border.radius};
    background: ${theme.color.accentGreen};
    border: none;
    text-transform: ${theme.textTransform.uppercase};
    color: ${theme.color.white};
    font-weight: ${theme.fontWeight.bold};
    box-shadow: ${theme.shadow.buttonShadow};
    &:hover {
      box-shadow: ${theme.shadow.buttonHover};
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
  }
`;

export default LoginView;
