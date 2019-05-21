import React from 'react';
import socketIOClient from 'socket.io-client';
import styled from 'styled-components';
import propTypes from 'prop-types';

// components
import Messages from '../components/Messages';
import MessageComposer from '../components/MessageComposer';
import RatingMessage from '../components/RatingMessage';
import Typing from '../components/Typing';
import theme from '../theme/styledTheme';

import { DOMAIN, SOCKET, CLOSED } from '../utils/constants';
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
    isCheckOut: false,
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
    socket.on(SOCKET.check_out, () => this.setState({ isCheckOut: true }));
    socket.on(SOCKET.chat_log, chatLog => {
      // replace the old chatlog with the new one
      const tickets = chatLog.tickets;
      const lastTicket = tickets[tickets.length - 1];
      const getRating =
        !!lastTicket && lastTicket.status === CLOSED && !lastTicket.rating;
      this.setState({
        chat_id: chatLog._id,
        tickets: chatLog.tickets,
        staffName: chatLog.staff_member ? chatLog.staff_member.name : '',
        getRating,
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
    this.setState({ messageInput: '', getRating: false });
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
      isCheckOut,
    } = this.state;
    return (
      <StyledChatView>
        <StyledHeader>
          <div className="header-names">
            <h1>{hotelName}</h1>
            <h2>{staffName ? staffName : ' '}</h2>
          </div>
          <button onClick={this.props.logout}>Logout</button>
        </StyledHeader>

        <Messages
          tickets={tickets}
          user_id={this.props.user._id}
          getRating={true}
        />
        {typingUser ? <Typing /> : null}
        {getRating ? <RatingMessage sendRating={this.sendRating} /> : null}
        {!isCheckOut ? (
          <MessageComposer
            sendMessage={this.sendMessage}
            setMessageInput={this.setMessageInput}
            messageInput={messageInput}
          />
        ) : null}
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
  margin: 3rem auto 2rem;
  padding: 2rem;

  height: 90vh;
  display: flex;
  flex-direction: column;
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

const StyledHeader = styled.header`
  display: flex;
  background-color: ${theme.color.lightPurple};
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-names {
    padding-left: 10px;
    height: 50px;
    h1 {
      font-size: ${theme.fontSize.xs};
    }
    h2 {
      font-size: ${theme.fontSize.xxs};
      padding-left: 5px;
      padding-bottom: 0.4rem;
    }
  }

  button {
    background-color: #da5151;
    border-radius: ${theme.border.radius};
    border: none;
    color: white;
    padding: 0, 0.5rem
    height: ${theme.button.smallButton};
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    font-size: ${theme.fontSize.xs};
    //margin: 4px 2px;
    cursor: pointer;
  }
`;

export default ChatView;
