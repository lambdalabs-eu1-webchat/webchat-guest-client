import React from 'react';
import socketIOClient from 'socket.io-client';
import styled from 'styled-components';
import propTypes from 'prop-types';

// components
import Messages from '../components/Messages';
import MessageComposer from '../components/MessageComposer';
import RatingMessage from '../components/RatingMessage';
import theme from '../theme/styledTheme'

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
      // emit that the ticket is done
      socket.emit(SOCKET.confirm_done_ticket);
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
    socket.emit(SOCKET.stopped_typing);
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
        <button className="btn" onClick={this.props.logout}>
          Logout
        </button>

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
  width: 25rem;
  height: 75vh;
  margin: 2.5vh auto;
  border-radius: 2rem;
  color:black;
  background-color:${theme.color.hoverPurple}
  padding:3.125rem;
  text-align: left;
  font-family: arial;
  position: relative;
  box-sizing: border-box;
  overflow-y:hidden;
    
  @media (max-width: 700px) {
    width: 90%;
  }
`;

const inputField = styled.div`

`;
export default ChatView;
