import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import Navbar from '../components/navbar/NavBar';
import jwt from 'jsonwebtoken';
// components
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import theme from '../theme/styledTheme';
// requests
import { loginRequest } from '../requests/ajax';

class LoginView extends React.Component {
  state = {
    nameInput: '',
    passcodeInput: '',
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
    loginRequest(this.state.nameInput, this.state.passcodeInput)
      .then(res => {
        this.props.setUserAndToken(res.user, res.token);
      })
      .catch(error => {
        // display a flash message
        console.log(error);
      });
  };

  render() {
    const { nameInput, passcodeInput } = this.state;
    return (

      <LoginWrapper>
        <Navbar />
        <StyledLoginView>
          <h2>Login</h2>
          <form className="container">
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                autoFocus
                value={nameInput}
                onChange={event => this.handleChange(event, 'nameInput')}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="passcode">Passcode</InputLabel>
              <Input
                name="passcode"
                type="passcode"
                id="passcode"
                autoComplete="current-passcode"
                value={passcodeInput}
                onChange={event => this.handleChange(event, 'passcodeInput')}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.login}
            >
              Login
            </Button>
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
  background: ${theme.color.lightPurple};
  height: 100vh;
`;

const StyledLoginView = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 2rem auto;
  padding: 0 1rem;

  h2 {
    text-align: left;
    font-size: ${theme.fontSize.m};
    padding: 20px 0;
    color: ${theme.color.textColor};
  }

  button {
    margin-top: 1rem;
  }
`;

export default LoginView;
