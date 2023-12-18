import React, { Component } from 'react';
import _debounce from 'lodash/debounce';
import MovieList from '../movie-list';

import './search-panel.css';

import { Input } from 'antd';
const { Search } = Input;

export default class SearchPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
    };
  }

  componentDidMount() {
    this.handleSearchDebounced = _debounce(this.handleSearch, 500);
  }

  handleSearch = () => {
    const { onSearch } = this.props;
    const { searchQuery } = this.state;

    if (onSearch && searchQuery.trim() !== '') {
      onSearch(searchQuery);
    }
  };

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value }, () => {
      this.handleSearchDebounced();
    });
  };

  render() {
    const { searchQuery } = this.props;

    return (
      <div className='search-panel'>
        <Search
          placeholder='Type to search...'
          onChange={this.handleChange}
        />
        <MovieList searchQuery={searchQuery} />
      </div>
    );
  }
}
