import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

function Message({ message, user_id }) {
  if (!message.sender) debugger;
  return (
    <StyledMessage left={user_id === message.sender.id}>
      <span>{message.sender.name} : </span>
      <div className='bubble-container'>
        <span className='bubble me'>{message.text}</span>
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
  margin: 10px;
  position: relative;

  border-radius: 0.4em;
  padding: 10px;
  ${props => (props.left ? `background: green;` : 'background: #00aabb;')}
  &:after {
    content: '';
    position: absolute;
    bottom: 0;

    width: 0;
    height: 0;
    border: 0.563em solid transparent;
    border-top-color: #00aabb;
    border-bottom: 0;
    margin-left: -0.281em;
    margin-bottom: -0.562em;
    ${props =>
      props.left
        ? `
    border-left:0;
    left: 3%;
    border-top-color: green;
    `
        : `
        border-right:0;
        right:3%;
        border-top-color: #00aabb;
  `}
  }
`;
// border-right: 0;
export default Message;
