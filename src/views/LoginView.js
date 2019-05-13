import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import jwt from 'jsonwebtoken';
// components
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
// requests
import { loginRequest } from '../requests/ajax';
const StyledLoginView = styled.div`
  width: 500px;
  margin: 0 auto;
`;

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
      <StyledLoginView>
        <div className="login">
          <h1>LOGIN</h1>
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
              Sign in
            </Button>
          </form>
        </div>
      </StyledLoginView>
    );
  }
}

LoginView.propTypes = {
  setUserAndToken: propTypes.func.isRequired,
};

export default LoginView;
