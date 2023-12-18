import React, { Component } from 'react';
import CommonList from '../common-list/';

import './movie-list.css';

export default class MovieList extends Component {
  render() {
    return (
      <CommonList
        movies={this.props.movies}
        loading={this.props.loading}
        error={this.props.error}
        currentPage={this.props.currentPage}
        totalPages={this.props.totalPages}
        onPageChange={this.props.onPageChange}
        fetchMovies={this.props.fetchMovies}
        emptyMessage={this.props.searchQuery ? `Фильмы с названием: "${this.props.searchQuery}" не найдены.` : null}
        onRateMovie={this.props.onRateMovie}
        ratedMovies={this.props.ratedMovies}
      />
    );
  }
}















