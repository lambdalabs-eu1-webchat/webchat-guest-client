import React from 'react';
import styled from 'styled-components';

import Message from './Message';

function Messages({ tickets }) {
  return (
    <StyledMessages>
      {tickets.map(ticket =>
        ticket.messages.map(message => <Message message={message} />),
      )}
    </StyledMessages>
  );
}

const StyledMessages = styled.div``;

export default Messages;
