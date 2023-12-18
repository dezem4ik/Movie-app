import React, { Component } from 'react';
import { parseISO, format } from 'date-fns';
import { Card } from 'antd';
import GenreContext from '../context';
import imgdef from './image-nf.jpg';
import RateComponent from '../rate-component';

import './movie-list-item.css';

export default class MovieListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageError: false,
      userRating: props.userRating !== undefined ? props.userRating : 0,
    };
  }

  handleImageError = () => {
    this.setState({
      imageError: true,
    });
  };

  handleRatingChange = (movieId, rating) => {
    this.props.onRatingChange(movieId, rating);
  };

  getRatingClass = (rating) => {
    if (rating >= 7) {
      return 'high-rating';
    } else if (rating >= 5) {
      return 'medium-rating';
    } else if (rating >= 3) {
      return 'low-rating';
    } else {
      return '';
    }
  };

  truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }

    const lastSpaceIndex = text.lastIndexOf(' ', maxLength);

    const truncatedText = text.slice(0, lastSpaceIndex) + '...';

    return truncatedText;
  };

  render() {
    const { movie, userRating } = this.props;
    const screenWidth = window.innerWidth;

    const originalDate = movie.release_date;
    const formattedDate = originalDate ? format(parseISO(originalDate), 'MMMM d, yyyy') : '';

    return (
      <Card>
        {movie.poster_path ? (
          <img
            className="movie-image"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="poster"
            onError={this.handleImageError}
          />
        ) : (
          <div className="placeholder">
            <img className="placeholder-image" src={imgdef} alt="placeholder" />
          </div>
        )}
        <div className="movie-about">
          <div className="movie-title-container">
            <h1 className="movie-title">{movie.title}</h1>
            <span className={`movie-vote ${this.getRatingClass(userRating)}`}>
              {userRating !== undefined ? userRating : '0'}
            </span>
          </div>
          <span className="movie-date">{formattedDate || 'N/A'}</span>
          <div className="movie-genre">
            <GenreContext.Consumer>
              {(genres) =>
                movie.genre_ids.map((genreId) => (
                  <span className="genre" key={genreId}>
                    {genres.find((genre) => genre.id === genreId)?.name || 'Unknown Genre'}
                  </span>
                ))
              }
            </GenreContext.Consumer>
          </div>
          <p className="movie-overview">
            {this.truncateText(
              movie.overview,
              screenWidth >= 768 && screenWidth <= 1024 ? 35 : 120
            )}
          </p>
          <span className="movie-popularity">
            <RateComponent userRating={userRating} movie={movie} onRatingChange={this.handleRatingChange} />
          </span>
        </div>
      </Card>
    );
  }
}

