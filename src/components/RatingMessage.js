import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

class RatingMessage extends React.Component {
  state = {
    rating: null,
  };
  setRating = rating => this.setState({ rating });
  render() {
    const stars = [];
    for (let i = 1; i < 6; i++) {
      if (i > this.state.rating) {
        // return a empty star
        stars.push(<i class='far fa-star' onClick={() => this.setRating(i)} />);
      } else if (i <= this.state.rating)
        // return a full star
        stars.push(<i class='fas fa-star' onClick={() => this.setRating(i)} />);
    }

    return <StyledRatingMessage>{stars}</StyledRatingMessage>;
  }
}

const StyledRatingMessage = styled.div``;

export default RatingMessage;
