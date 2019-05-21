import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import theme from '../theme/styledTheme';

function MessageComposer({ messageInput, setMessageInput, sendMessage }) {
  function updateInput(event) {
    setMessageInput(event.target.value);
  }
  function handleEnterPress(event) {
    if ('Enter' === event.key) sendMessage();
  }
  return (
    <StyledMessageComposer>
      <input
        onKeyPress={handleEnterPress}
        className="flex"
        onChange={updateInput}
        value={messageInput}
      />
      <button onClick={sendMessage}>
        <i className="fas fa-paper-plane" />
      </button>
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

  input {
    border: none;
    border-bottom: 1px solid ${theme.color.footerText};
    margin-bottom: 20px;
    height: ${theme.input.height};
    font-size: ${theme.fontSize.xxs};
    padding: 20px 0;
    border-radius: 0;
    &:focus {
      outline: none;
    }
  }

  .flex {
    flex: 1;
  }

  button {
    border: none;
    background: none;
    &:focus {
      outline: none;
    }
  }

  .fa-paper-plane {
    background: transparent;
    color: ${theme.color.accentGreen};
    font-size: ${theme.fontSize.m};
    cursor: pointer;
    &:hover {
      color: ${theme.color.accentPurple};
    }
  }
`;

export default MessageComposer;
