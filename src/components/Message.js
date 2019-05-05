import React from 'react';
import styled from 'styled-components';

function Message({ message }) {
  if (!message.sender) debugger;
  return (
    <StyledMessage>
      <span>{message.sender.name} : </span>
      {message.text}
    </StyledMessage>
  );
}

const StyledMessage = styled.div`
  padding-bottom: 8px;
`;

export default Message;
