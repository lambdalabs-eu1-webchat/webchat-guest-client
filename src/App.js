import React from 'react';

import LoginView from './views/LoginView';
import ChatView from './views/ChatView';

class App extends React.Component {
  state = {
    user: null,
    token: null,
  };
  componentDidMount() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      this.setState({ user, token });
    }
  }
  setUserAndToken = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.setState({ user, token });
  };
  logout = () => {
    localStorage.clear();
    this.setState({ user: null, token: null });
  };
  render() {
    const { user, token } = this.state;
    if (!token) return <LoginView setUserAndToken={this.setUserAndToken} />;
    return <ChatView user={user} token={token} logout={this.logout} />;
  }
}

export default App;
