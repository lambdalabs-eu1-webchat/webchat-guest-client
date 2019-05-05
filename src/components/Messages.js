import React from 'react';
import styled from 'styled-components';

import Message from './Message';

function Messages({ tickets }) {
  return (
    <StyledMessages>
      {tickets.map(ticket =>
        ticket.messages.map(message => (
          <Message key={message._id} message={message} />
        )),
      )}
    </StyledMessages>
  );
}

const StyledMessages = styled.div``;

export default Messages;
