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
      <Input className='flex' onChange={updateInput} value={messageInput} />
      <Button onClick={sendMessage}>Send</Button>
    </StyledMessageComposer>
  );
}

const StyledMessageComposer = styled.div`
  display: flex;
  width: 100%;
  justify-content: stretch;
  .flex {
    flex: 1;
  }
`;

export default MessageComposer;
