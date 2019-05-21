import React from 'react';
import styled from 'styled-components';
import theme from '../theme/styledTheme';

function Typing() {
  return (
    <StyledTyping>
      <div className="wave">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </StyledTyping>
  );
}

const StyledTyping = styled.div`
  .wave {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    margin-top: 14px;
    .dot {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 3px;
      background: #303131;
      animation: wave 1.3s linear infinite;
      background-color: ${theme.color.accentPurple};

      &:nth-child(2) {
        animation-delay: -1.1s;
      }

      &:nth-child(3) {
        animation-delay: -0.9s;
      }
    }
  }

  @keyframes wave {
    0%,
    60%,
    100% {
      transform: initial;
    }

    30% {
      transform: translateY(-15px);
    }
  }
`;

export default Typing;
