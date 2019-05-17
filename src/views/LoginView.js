import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import Navbar from '../components/navbar/NavBar'
// components
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import theme from '../theme/styledTheme'
// requests
import { loginRequest } from '../requests/ajax';
const StyledLoginView = styled.div`
padding: 5rem 5rem 11rem 5rem;
background: ${theme.color.lightPurple};
margin: 0 5rem;
@media(max-width: 500px) {
  padding: 3rem;
  margin: 0;
}
`;

class LoginView extends React.Component {
  state = {
    nameInput: '',
    passcodeInput: '',
  };

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
    <div>
       <Navbar />
      <StyledLoginView>
         
          <div className="login"> 
          <h1>LOGIN</h1>
        <form className="container">
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
          </div>
      </StyledLoginView>
      </div>
    );
  }
}

LoginView.propTypes = {
  setUserAndToken: propTypes.func.isRequired,
};

export default LoginView;
