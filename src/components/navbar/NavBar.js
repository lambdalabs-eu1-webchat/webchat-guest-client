import React from 'react';
import styled from 'styled-components';
import logo from './logo2.svg';
import theme from '../../theme/styledTheme';

const NavBar = () => {
  return (
    <StyledNav>
      <img src={logo} alt="logo" />
    </StyledNav>
  );
};
export default NavBar;

const StyledNav = styled.nav`
  background: ${theme.color.secondaryPurple};
  padding: 1rem 2.5rem;

  img {
    max-width: 400px;
  }
`;
