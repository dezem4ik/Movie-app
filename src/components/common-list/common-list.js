import React, { Component, Fragment } from 'react';
import MovieListItem from '../movie-list-item';
import { List, Spin, Alert, Pagination } from 'antd';
import { Online, Offline } from 'react-detect-offline';

export default class CommonList extends Component {
  renderMovies() {
    const { movies, onRateMovie, ratedMovies } = this.props;
  
    return movies.map((movie) => (
      <MovieListItem
        key={movie.id}
        movie={movie}
        onRatingChange={onRateMovie}
        userRating={ratedMovies && ratedMovies[movie.id]}
      />
    ));
  }
  

  handlePaginationChange = (page) => {
    const { onPageChange, fetchMovies } = this.props;
    if (onPageChange) {
      onPageChange(page);
    } else if (fetchMovies) {
      fetchMovies(page);
    }
  };

  render() {
    const { movies, loading, error, currentPage, totalPages, emptyMessage } = this.props;
  
    return (
      <>
        <Online>
          {loading && (
            <div className='centered-spinner'>
              <Spin spinning={loading} size='large' />
            </div>
          )}
  
          {!loading && error && (
            <div className='centered-alert'>
              <Alert message={`Error: ${error}`} type='error' />
            </div>
          )}
  
          {!loading && (
            <>
              {(!movies || movies.length === 0) ? (
                emptyMessage && (
                  <div className='no-results-message'>
                    {emptyMessage}
                  </div>
                )
              ) : (
                <>
                  <List className='movie-list'>{this.renderMovies()}</List>
                  <div className='pagination'>
                    <Pagination
                      current={currentPage}
                      total={totalPages}
                      onChange={this.handlePaginationChange}
                    />
                  </div>
                </>
              )}
            </>
          )}

        </Online>
  
        <Offline>
          <div className='centered-alert'>
            <Alert message='No internet connection' type='error' />
          </div>
        </Offline>
      </>
    );
  }
}