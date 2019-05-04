import React from 'react';
import socketIOClient from 'socket.io-client';
import { DOMAIN, SOCKET } from '../utils/constants';

class ChatView extends React.Component {
  componentDidMount() {
    const socket = socketIOClient(DOMAIN);
    socket.on(SOCKET.connection, is_connect => {
      console.log('connected');
    });
  }

  render() {
    return <h1>Chat</h1>;
  }
}

export default ChatView;
