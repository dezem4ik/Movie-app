import React, { Component } from 'react';
import { Tabs } from 'antd';
import SearchPanel from '../search-panel';

import './header.css';

export default class Header extends Component {
  handleTabChange = (key) => {
    this.props.onTabChange(key);
  };

  render() {
    const { activeTab, searchQuery } = this.props;

    const items = [
      {
        key: 'search',
        label: 'Search',
        children: <SearchPanel onSearch={this.props.onSearch} />,
      },
      {
        key: 'rated',
        label: 'Rated',
        children: this.props.ratedMoviesComponent,
      },
    ];

    return (
      <div className={`tabs ${searchQuery ? 'with-content' : 'without-content'}`}>
        <Tabs
          size="large"
          activeKey={activeTab}
          onChange={this.handleTabChange}
          items={items.map((item) => ({
            key: item.key,
            label: item.label,
            children: item.children,
          }))}
        />
      </div>
    );
  }
}












