import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import theme from '../theme/styledTheme';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

function MessageComposer({ messageInput, setMessageInput, sendMessage }) {
  function updateInput(event) {
    setMessageInput(event.target.value);
  }
  return (
    <StyledMessageComposer>
      <Input className="flex" onChange={updateInput} value={messageInput} />
      <Button onClick={sendMessage}>
        <i className="fas fa-paper-plane" />
      </Button>
    </StyledMessageComposer>
  );
}

MessageComposer.propTypes = {
  messageInput: propTypes.string.isRequired,
  sendMessage: propTypes.func.isRequired,
  setMessageInput: propTypes.func.isRequired,
};

const StyledMessageComposer = styled.div`
  display: flex;
  width: 100%;
  justify-content: stretch;
  .flex {
    flex: 1;
  }

  .fa-paper-plane {
    background: transparent;
    color: ${theme.color.accentGreen};
    font-size: 1.5rem;
  }
`;

export default MessageComposer;
