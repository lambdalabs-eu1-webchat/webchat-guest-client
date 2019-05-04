import React from 'react';
import styled from 'styled-components';
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
    nameInput: 'connor',
    passcodeInput: 'c53nrnid3d',
  };

  handleChange = (event, input) => {
    console.log(event.target.value);
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
        debugger;
        this.props.setUserAndToken(res.user, res.token);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { nameInput, passcodeInput } = this.state;
    return (
      <StyledLoginView>
        <h1>LOGIN</h1>
        <form>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='name'>Name</InputLabel>
            <Input
              id='name'
              name='name'
              autoComplete='name'
              autoFocus
              value={nameInput}
              onChange={event => this.handleChange(event, 'nameInput')}
            />
          </FormControl>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='passcode'>Passcode</InputLabel>
            <Input
              name='passcode'
              type='passcode'
              id='passcode'
              autoComplete='current-passcode'
              value={passcodeInput}
              onChange={event => this.handleChange(event, 'passcodeInput')}
            />
          </FormControl>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            onClick={this.login}
          >
            Sign in
          </Button>
        </form>
      </StyledLoginView>
    );
  }
}

export default LoginView;
