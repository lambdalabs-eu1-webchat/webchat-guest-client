import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import theme from './../theme/styledTheme';

class RatingMessage extends React.Component {
  state = {
    rating: null,
  };
  setRating = rating => this.setState({ rating });
  handleSubmit = () => {
    const { rating } = this.state;
    if (rating) this.props.sendRating(rating);
  };
  render() {
    const stars = [];
    for (let i = 1; i < 6; i++) {
      if (i > this.state.rating) {
        // return a empty star
        stars.push(
          <i
            key={i}
            className='far fa-star'
            onClick={() => this.setRating(i)}
          />,
        );
      } else if (i <= this.state.rating)
        // return a full star
        stars.push(
          <i
            key={i}
            className='fas fa-star'
            onClick={() => this.setRating(i)}
          />,
        );
    }
    return (
      <StyledRatingMessage>
        {stars}
        <button onClick={this.handleSubmit}>Submit</button>
      </StyledRatingMessage>
    );
  }
}
RatingMessage.propTypes = {
  sendRating: propTypes.func.isRequired,
};

const StyledRatingMessage = styled.div`
  padding: 1rem 0;
  
  .far {
    color: ${theme.color.accentPurple};
    font-size: ${theme.fontSize.m};
  }
  
  .fas {
    color: ${theme.color.accentPurple};
    font-size: ${theme.fontSize.m};
  }
  
  button {
    width: 15rem;
    height: ${theme.button.smallButton};
    font-size: ${theme.fontSize.xs};
    border-radius: ${theme.border.radius};
    background: ${theme.color.accentGreen};
    border: none;
    text-transform: ${theme.textTransform.uppercase};
    color: ${theme.color.white};
    margin-left: 5px;
    box-shadow: ${theme.shadow.buttonShadow};
    &:hover {
      box-shadow: ${theme.shadow.buttonHover};
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
  }
`;

export default RatingMessage;
