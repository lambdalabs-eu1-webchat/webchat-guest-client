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
  margin: 1.25rem 0;
  max-width: 65%;
  font-size: ${theme.fontSize.xxs};
  color: ${theme.color.textColor};
  padding: 2rem;
  
    ${props =>
      props.left
        ? `background:${theme.color.footerText};`
        : `background:${theme.color.lightPurple};`}
    ${props => (props.left ? `text-align: right;` : 'text-align: left;')}
    ${props => (props.left ? `margin-left: auto;` : 'margin-right: auto;')}
    ${props => (props.left ? `border-radius: 2rem 2rem 0.3rem 2rem` : 'border-radius: 2rem 2rem 2rem 0.3rem;')}
`;

export default Message;
