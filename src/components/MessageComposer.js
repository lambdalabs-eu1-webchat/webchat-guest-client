import React from 'react';
import styled from 'styled-components';

import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

function MessageComposer(props) {
  return (
    <StyledMessageComposer>
      <input />
      <button>Send</button>
    </StyledMessageComposer>
  );
}

const StyledMessageComposer = styled.div``;

export default MessageComposer;
