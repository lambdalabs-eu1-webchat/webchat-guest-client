import React from 'react';
import styled from 'styled-components';

import Message from './Message';

function Messages({ tickets, user_id }) {
  return (
    <StyledMessages>
      {tickets.map(ticket =>
        ticket.messages.map(message => (
          <Message key={message._id} message={message} user_id={user_id} />
        )),
      )}
    </StyledMessages>
  );
}

const StyledMessages = styled.div``;

export default Messages;
