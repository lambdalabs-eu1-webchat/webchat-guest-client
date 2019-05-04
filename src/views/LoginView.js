import React from 'react';
import styled from 'styled-components';
// components
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

const StyledLoginView = styled.div`
  width: 500px;
  margin: 0 auto;
`;

class LoginView extends React.Component {
  state = {
    nameInput: '',
    passcodeInput: '',
  };

  handleChange = (event, input) => {
    console.log(event.target.value);
    const value = event.target.value;
    this.setState(currentState => {
      currentState[input] = value;
      debugger;
      return currentState;
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
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Sign in
          </Button>
        </form>
      </StyledLoginView>
    );
  }
}

export default LoginView;
