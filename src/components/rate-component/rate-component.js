import React, { Component } from 'react';
import { Rate } from 'antd';

export default class RateComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localRating: props.userRating || 0,
    };
  }

  handleRatingChange = (value) => {
    this.setState({ localRating: value }, () => {
      const { onRatingChange, movie } = this.props;
      onRatingChange(movie.id, value);
    });
  };

  render() {
    const { localRating } = this.state;

    return (
      <Rate
        allowHalf
        count={10}
        value={localRating}
        onChange={this.handleRatingChange}
        style={{ fontSize: 18, marginLeft: 8 }}
      />
    );
  }
}









