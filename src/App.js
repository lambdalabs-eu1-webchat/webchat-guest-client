import React from 'react';

import LoginView from './views/LoginView';
import ChatView from './views/ChatView';

class App extends React.Component {
  state = {
    user: null,
    token: null,
  };
  setUserAndToken = (user, token) => {
    this.setState({ user, token });
  };
  render() {
    const { user, token } = this.state;
    if (!token) return <LoginView setUserAndToken={this.setUserAndToken} />;
    return <ChatView user={user} token={token} />;
  }
}

export default App;
