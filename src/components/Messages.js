import React from 'react';
import styled from 'styled-components';

import Message from './Message';

class Messages extends React.Component {
  scrollToBottom = scrollParams => {
    this.messagesEnd.scrollIntoView(scrollParams); //{ behavior: 'smooth' }
  };
  componentDidUpdate = () => {
    this.scrollToBottom();
  };
  render() {
    const { tickets, user_id } = this.props;
    return (
      <StyledMessages>
        {tickets.map(ticket =>
          ticket.messages.map(message => (
            <Message key={message._id} message={message} user_id={user_id} />
          )),
        )}
        <div
          ref={el => {
            this.messagesEnd = el;
          }}
        >
          >
        </div>
      </StyledMessages>
    );
  }
}

const StyledMessages = styled.div`
  height: 95vh;
  overflow-y: scroll;
`;

export default Messages;
