import React, { Component } from 'react';

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  render() {
    const { totalPages, currentPage } = this.props;
    if (totalPages === 1) {
      return null;
    }

    return (
      <nav style={{ display: 'flex', justifyContent: 'space-around' }}>
        <a href="#" onClick={(e) => currentPage > 1 && this.handlePaginationClick(e, currentPage - 1)}>Previous</a>
				<div>{currentPage} / {totalPages}</div>
				<a href="#" onClick={(e) => this.handlePaginationClick(e, currentPage + 1)}>Next</a>
      </nav>
    );
  }

  handlePaginationClick(e, page) {
    e.preventDefault();
    const { totalPages } = this.props;
    const withinBounds = page >= 0 && page < totalPages;
    if (withinBounds) {
      this.props.onPaginationChange(page);
    }
  }
}

Pagination.propTypes = {
  currentPage: React.PropTypes.number.isRequired,
  totalPages: React.PropTypes.number.isRequired,
};
