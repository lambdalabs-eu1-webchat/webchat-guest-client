import React from 'react';
import socketIOClient from 'socket.io-client';
import styled from 'styled-components';
import propTypes from 'prop-types';

// components
import Messages from '../components/Messages';
import MessageComposer from '../components/MessageComposer';
import RatingMessage from '../components/RatingMessage';

import { DOMAIN, SOCKET } from '../utils/constants';

class ChatView extends React.Component {
  state = {
    chat_id: null,
    tickets: [],
    messageInput: '',
    getRating: false,
    typingUser: null,
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

          return {
            ...ticket,
            messages: [...ticket.messages, messageRes.message],
          };
        });
        // set the state of the tickets
        return { tickets: newTickets };
      });
    });
    // set up when requested for a review
    socket.on(SOCKET.rating, () => {
      this.setState({ getRating: true });
    });
    // set up currently typing
    socket.on(SOCKET.typing, ({ user }) => {
      if (user._id !== this.props.user._id) {
        this.setState({ typingUser: user });
      }
    });
    socket.on(SOCKET.stopped_typing, ({ user }) => {
      if (user._id !== this.props.user._id) {
        this.setState({ typingUser: null });
      }
    });
  }

  setMessageInput = messageInput => {
    const { socket } = this.state;
    // if not typing
    if (messageInput.length === 0) {
      socket.emit(SOCKET.stopped_typing);
      // if typing
    } else if (messageInput.length > 0) {
      socket.emit(SOCKET.typing);
    }
    this.setState({
      messageInput,
    });
  };

  sendMessage = () => {
    const { socket, messageInput } = this.state;
    // want to check that it is is not empty
    //send message
    socket.emit(SOCKET.message, messageInput);
    // clear input ---->later do this on confirm that message was recieved
    this.setState({ messageInput: '' });
  };

  sendRating = rating => {
    this.state.socket.emit(SOCKET.rating, rating);
    this.setState({ getRating: false });
  };
  render() {
    const { tickets, messageInput, getRating, typingUser } = this.state;
    return (
      <StyledChatView>
        <button className="btn" onClick={this.props.logout}>Logout</button>

        <Messages
          tickets={tickets}
          user_id={this.props.user._id}
          getRating={true}
        />
        {typingUser ? <p>{typingUser.name} is typing</p> : null}
        {getRating ? <RatingMessage sendRating={this.sendRating} /> : null}
        <MessageComposer
          sendMessage={this.sendMessage}
          setMessageInput={this.setMessageInput}
          messageInput={messageInput}
        />
      </StyledChatView>
    );
  }
}

ChatView.propTypes = {
  user: propTypes.shape({
    _id: propTypes.string.isRequired,
    hotel_id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    room: propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  token: propTypes.string,
};

const StyledChatView = styled.div`
  width: 350px;
  height: 95vh;
  margin: 2.5vh auto;
  border-radius: 20px;
  background: #296ba9;
  color: #fff;
  padding: 50px;
  text-align: left;
  font-weight: 900;
  font-family: arial;
  position: relative;
  box-sizing: border-box;
`;
export default ChatView;
