import React from 'react';
import socketIOClient from 'socket.io-client';
import styled from 'styled-components';

// components
import Messages from '../components/Messages';
import MessageComposer from '../components/MessageComposer';

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
    socket.on(SOCKET.message, messageRes => {
      // place the message in the latest ticket messages
      this.setState(curState => {
        const tickets = curState.tickets;
        const ticketLastIndex = tickets.length - 1;
        const newTickets = tickets.map((ticket, i) => {
          // making the new state of the tickets
          if (ticketLastIndex !== i) return ticket;
          if (ticketLastIndex === i)
            return {
              ...ticket,
              messages: [...ticket.messages, messageRes.message],
            };
        });
        // set the state of the tickets
        return { tickets: newTickets };
      });
    });
  }

  render() {
    const { tickets } = this.state;
    return (
      <StyledChatView>
        <Messages tickets={tickets} />
        <MessageComposer />
      </StyledChatView>
    );
  }
}

const StyledChatView = styled.div``;

export default ChatView;
