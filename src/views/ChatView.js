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
    messageInput: '',
  };
  componentDidMount() {
    const socket = socketIOClient(DOMAIN);
    // save the socket in state to use in other places
    this.setState({ socket });
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

  setMessageInput = messageInput => {
    this.setState({ messageInput });
  };

  sendMessage = () => {
    const { socket, messageInput } = this.state;
    // want to check that it is is not empty
    //send message
    socket.emit(SOCKET.message, messageInput);
    // clear input ---->later do this on confirm that message was recieved
  };

  render() {
    const { tickets, messageInput } = this.state;
    return (
      <StyledChatView>
        <Messages tickets={tickets} user_id={this.props.user._id} />
        <MessageComposer
          sendMessage={this.sendMessage}
          setMessageInput={this.setMessageInput}
          messageInput={messageInput}
        />
      </StyledChatView>
    );
  }
}

const StyledChatView = styled.div``;

export default ChatView;
