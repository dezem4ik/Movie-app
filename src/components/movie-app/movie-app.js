import React, { Component, Fragment } from 'react';
import { GenreProvider } from '../context/context';
import Header from '../header';
import MovieList from '../movie-list';
import MovieService from '../../services';
import RatedMovies from '../rated-movies';

import './movie-app.css';

export default class MovieApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      movies: [],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
      activeTab: 'search',
      guestSessionId: null,
      genres: [],
      ratedMovies: JSON.parse(localStorage.getItem('ratedMovies')) || {},
    };

    this.movieService = new MovieService();
  }

  componentDidMount() {
    this.createGuestSession();
    this.fetchGenres();
    this.resetRatingsOnPageRefresh();
  }

  resetRatingsOnPageRefresh = () => {
    const { ratedMovies } = this.state;
  
    if (Object.keys(ratedMovies).length > 0) {
      localStorage.removeItem('ratedMovies');
      this.setState({ ratedMovies: {} });
    }
  };

  fetchGenres() {
    this.movieService.fetchGenres()
      .then(genres => this.setState({ genres }))
      .catch(error => {
        console.error('Error fetching genres:', error);
      });
  }

  createGuestSession() {
    this.movieService
      .createGuestSession()
      .then(guestSession => {
        this.setState({ guestSessionId: guestSession.guest_session_id });
      })
  }

  resetRatings = () => {
    localStorage.removeItem('ratedMovies');
    this.setState({ ratedMovies: {} });
  };

  handleSearch = (searchQuery) => {
    this.setState({ searchQuery: searchQuery.trim(), currentPage: 1, loading: true }, () => {
      this.state.activeTab === 'search' ? this.fetchMovies() : this.fetchRatedMovies();
    });
  };

  handleTabChange = (activeTab) => {
    this.setState({ activeTab, currentPage: 1, movies: [] }, () => {
      activeTab === 'search' ? this.fetchMovies() : this.fetchRatedMovies();
    });
  };

  fetchRatedMovies = async () => {
    const { guestSessionId, currentPage } = this.state;
    try {
      const data = await this.movieService.fetchRatedMovies(guestSessionId, currentPage);
      this.setState({
        movies: data.results,
        loading: false,
        error: null,
        totalPages: data.total_pages,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error.message,
      });
    }
  };

  fetchMovies = () => {
    const { currentPage, searchQuery } = this.state;
    if (!searchQuery) {
      return;
    }

    this.setState({ loading: true });

    this.movieService.getResource(searchQuery, currentPage)
      .then((data) => {
        this.setState({
          movies: data.results,
          loading: false,
          error: null,
          totalPages: data.total_pages,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.message,
        });
      });
  };

  handleFetchRatedMovies = (page) => {
    this.setState({ currentPage: page, loading: true }, this.fetchRatedMovies);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page, loading: true }, this.fetchMovies);
  };

  handleRateMovie = async (movieId, rating) => {
    const { guestSessionId, ratedMovies } = this.state;

    if (ratedMovies[movieId] === rating) {
      return;
    }

    this.movieService.rateMovie(movieId, rating, guestSessionId);

    this.setState((prevState) => {
      const ratedMovies = { ...prevState.ratedMovies, [movieId]: rating };
      localStorage.setItem('ratedMovies', JSON.stringify(ratedMovies));
      return { ratedMovies };
    })
  };

  render() {
    const { genres, ratedMovies } = this.state;

    return (
      <GenreProvider value={genres}>
        <Fragment>
          <Header
            onSearch={this.handleSearch}
            onTabChange={this.handleTabChange}
            activeTab={this.state.activeTab}
            searchQuery={this.state.searchQuery}
          />
          <section className='movies'>
            {this.state.activeTab === 'search' ? (
              <MovieList
                searchQuery={this.state.searchQuery}
                movies={this.state.movies}
                loading={this.state.loading}
                error={this.state.error}
                currentPage={this.state.currentPage}
                totalPages={this.state.totalPages}
                onPageChange={this.handlePageChange}
                movieService={this.movieService}
                onRateMovie={this.handleRateMovie}
                ratedMovies={ratedMovies}
              />
            ) : (
              <RatedMovies
                movies={this.state.movies}
                loading={this.state.loading}
                error={this.state.error}
                currentPage={this.state.currentPage}
                totalPages={this.state.totalPages}
                onPageChange={this.handleFetchRatedMovies}
                fetchRatedMovies={this.fetchRatedMovies}
                movieService={this.movieService}
                guestSessionId={this.state.guestSessionId}
                onRateMovie={this.handleRateMovie}
                ratedMovies={ratedMovies}
              />
            )}

          </section>
        </Fragment>
      </GenreProvider>
    );
  }
}












