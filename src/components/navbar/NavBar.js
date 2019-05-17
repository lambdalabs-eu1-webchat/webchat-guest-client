import React from 'react';
import styled from 'styled-components';
import logo from './logo2.svg';
import theme from '../../theme/styledTheme';

const NavBar = props => {
  return (
    <StyledNav className="nav-wrapper navy darken-2 hide-on-print">
      <div className="container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />{' '}
        </header>
      </div>
    </StyledNav>
  );
};
export default NavBar;

const StyledNav = styled.nav`
  background: ${theme.color.secondaryPurple};
  padding: 1rem 2.5rem;
  text-transform: uppercase;
  a {
    text-decoration: none;
    font-size: ${theme.fontSize.xs};
    color: ${theme.color.white};
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    img {
      border-radius: 0;
      width: 60%;
    }
  }
  .tickets {
    color: ${theme.color.accentGreen};
  }
  .active {
    color: ${theme.color.white};
  }
  .brand-logo {
    z-index: 5;
  }
`;
