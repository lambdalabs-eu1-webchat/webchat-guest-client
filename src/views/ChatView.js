import React from 'react';
import socketIOClient from 'socket.io-client';
import { DOMAIN, SOCKET } from '../utils/constants';

class ChatView extends React.Component {
  componentDidMount() {
    const socket = socketIOClient(DOMAIN);
    socket.on(SOCKET.connection, () => {
      console.log('connected');
      // auth this connection
      socket.emit(SOCKET.login, this.props.token);
    });
    socket.on(SOCKET.chat_log, chatLog => {
      console.log(chatLog);
    });
  }

  render() {
    return <h1>Chat</h1>;
  }
}

export default ChatView;
