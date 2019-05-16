import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import theme from '../theme/styledTheme'

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
margin: 2rem;
position: relative;
max-width: 60%;
border-radius:1em;
padding: 2rem;
width:70em;
overflow: scroll;


${props => (props.left ? `background:${theme.color.footerText};` : `background:${theme.color.accentPurple};`)}
${props => (props.left ? `text-align: right;` : 'text-align: left;')}
${props => (props.left ? `margin-left:auto;` : 'margin-right:auto;')}
&:after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 0.2rem;
  height: -20.2em;
  border: 1em solid transparent ;
  border-bottom:20em;
  margin-right: -0.1em;
  margin-bottom: -0.562em;

}
`;
// border-right: 0;
export default Message;
