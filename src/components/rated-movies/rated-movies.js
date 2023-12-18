import React, { Component } from 'react';
import CommonList from '../common-list/'

export default class RatedMovies extends Component {
  render() {
    return (
      <CommonList
        movies={this.props.movies}
        loading={this.props.loading}
        error={this.props.error}
        currentPage={this.props.currentPage}
        totalPages={this.props.totalPages}
        onPageChange={this.props.onPageChange}
        fetchMovies={this.props.fetchRatedMovies}
        onRateMovie={this.props.onRateMovie}
        ratedMovies={this.props.ratedMovies}
      />
    );
  }
}