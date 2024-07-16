import React, { Component } from 'react';
import styles from './SearchBar.module.css';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    const { onSubmit } = this.props;
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return alert('Input is empty!');
    }
    onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={styles.SearchBar}>
        <form onSubmit={this.handleSubmit} className={styles.SearchForm}>
          <input
            type="text"
            className={styles.SearchFormInput}
            placeholder="Search images"
            autoFocus
            autoComplete="off"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
          <button type="submit" className={styles.SearchFormButton}></button>
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
