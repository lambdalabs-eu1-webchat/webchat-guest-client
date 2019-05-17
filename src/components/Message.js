import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import theme from '../theme/styledTheme';

function Message({ message, user_id }) {
  if (!message.sender);
  return (
    <StyledMessage left={user_id === message.sender.id}>
      <span>{message.sender.name} : </span>
      <div>
        <span>{message.text}</span>
      </div>
    </StyledMessage>
  );
}

Message.propTypes = {
  message: propTypes.shape({
    _id: propTypes.string.isRequired,
    sender: propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
    }).isRequired,
  }),
  user_id: propTypes.string.isRequired,
};

const StyledMessage = styled.div`
  margin: 1rem 0;
  max-width: 50%;
  border-radius:1em;
  padding: 1rem;

  ${props =>
    props.left
      ? `background:${theme.color.footerText};`
      : `background:${theme.color.accentPurple};`}
  ${props => (props.left ? `text-align: right;` : 'text-align: left;')}
  ${props => (props.left ? `margin-left: auto;` : 'margin-right: auto;')}
`;

export default Message;
