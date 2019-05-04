import React from 'react';
import socketIOClient from 'socket.io-client';
import { DOMAIN, SOCKET } from '../utils/constants';

class ChatView extends React.Component {
  state = {
    chat_id: null,
    tickets: [],
  };
  componentDidMount() {
    const socket = socketIOClient(DOMAIN);
    socket.on(SOCKET.connection, () => {
      console.log('connected');
      // auth this connection
      socket.emit(SOCKET.login, this.props.token);
    });
    socket.on(SOCKET.chat_log, chatLog => {
      // replace the old chatlog with the new one
      this.setState({ chat_id: chatLog._id, tickets: chatLog.tickets });
      console.log(chatLog);
    });
    socket.on(SOCKET.message, message => {
      // place the message in the latest ticket messages
    });
  }

  render() {
    return <h1>Chat</h1>;
  }
}

export default ChatView;
