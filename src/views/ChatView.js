import React from 'react';
import socketIOClient from 'socket.io-client';
import styled from 'styled-components';
import propTypes from 'prop-types';

// components
import Messages from '../components/Messages';
import MessageComposer from '../components/MessageComposer';
import RatingMessage from '../components/RatingMessage';
import theme from '../theme/styledTheme';

import { DOMAIN, SOCKET } from '../utils/constants';
import { getHotel } from '../requests/ajax';

class ChatView extends React.Component {
  state = {
    chat_id: null,
    tickets: [],
    messageInput: '',
    getRating: false,
    typingUser: null,
    hotelName: '',
    staffName: '',
  };
  componentDidMount() {
    // get the hotel info
    getHotel(this.props.user.hotel_id)
      .then(hotel => {
        this.setState({ hotelName: hotel.name });
      })
      .catch(error => console.log(error));
    const socket = socketIOClient(DOMAIN);
    // save the socket in state to use in other places
    this.setState({ socket });
    socket.on(SOCKET.connection, () => {
      // auth this connection
      socket.emit(SOCKET.login, this.props.token);
    });

    socket.on(SOCKET.chat_log, chatLog => {
      // replace the old chatlog with the new one

      this.setState({
        chat_id: chatLog._id,
        tickets: chatLog.tickets,
        staffName: chatLog.staff_member ? chatLog.staff_member.name : '',
      });
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
    const {
      tickets,
      messageInput,
      getRating,
      typingUser,
      hotelName,
      staffName,
    } = this.state;
    console.log(hotelName);
    return (
      <StyledChatView>
        <ButtonWrap>
          <button onClick={this.props.logout}>Logout</button>
        </ButtonWrap>
        <h2>{hotelName}</h2>
        {staffName ? <h3>{staffName}</h3> : null}
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
  width: 45rem;
  height: 80vh;
  margin: 3rem auto 2rem;
  padding: 2rem;
  overflow-y: hidden;

  @media (max-width: 700px) {
    width: 100%;
    margin: 0;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
  }
`;

const ButtonWrap = styled.div`
  //border-bottom: 1px solid rgba(0, 0, 0, 0.42);

  button {
    background-color: #da5151;
    border-radius: ${theme.border.radius};
    border: none;
    color: white;
    padding: 0;
    //padding: 1rem 2rem;
    height: ${theme.button.smallButton};
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    width: 100%;
    font-size: ${theme.fontSize.xs};
    //margin: 4px 2px;
    cursor: pointer;
  }
`;

export default ChatView;
