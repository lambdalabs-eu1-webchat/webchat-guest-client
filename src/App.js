import React from 'react';

import LoginView from './views/LoginView';
import ChatView from './views/ChatView';

class App extends React.Component {
  state = {
    user: null,
    token: null,
  };
  render() {
    const { user, token } = this.state;
    if (!token) return <LoginView />;
    return <ChatView />;
  }
}

export default App;
