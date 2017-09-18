import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

const Pagination = ({ handlePageClick, pageCount }) => (
  <ReactPaginate
    previousLabel={'previous'}
    nextLabel={'next'}
    breakLabel={<a href="">...</a>}
    breakClassName={'break-me'}
    pageCount={pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={2}
    onPageChange={handlePageClick}
    containerClassName={'pagination'}
    subContainerClassName={'pages pagination'}
    activeClassName={'active'}
  />
);

Pagination.propTypes = {
  handlePageClick: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired
};
export default Pagination;
