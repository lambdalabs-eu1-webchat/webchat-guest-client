import React from 'react';
import styled from 'styled-components';

import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

function MessageComposer({ messageInput, setMessageInput, sendMessage }) {
  function updateInput(event) {
    setMessageInput(event.target.value);
  }
  return (
    <StyledMessageComposer>
      <input onChange={updateInput} value={messageInput} />
      <button onClick={sendMessage}>Send</button>
    </StyledMessageComposer>
  );
}

const StyledMessageComposer = styled.div``;

export default MessageComposer;
