import React from 'react';
import styled from 'styled-components';

function Message({ message }) {
  return <StyledMessage>{message.text}</StyledMessage>;
}

const StyledMessage = styled.div``;

export default Message;
