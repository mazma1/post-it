import React from 'react';
import { PropTypes } from 'prop-types';
import SearchResultTable from '../tables/SearchResultTable';


/**
 * Displays the search result
 *
 * @param {object} props
 *
 * @returns {JSX} Search Result markup
 */
const SearchResult = props => (
  <div>
    <SearchResultTable searchQuery={props.searchQuery} />
  </div>
);

SearchResult.propTypes = {
  searchQuery: PropTypes.string.isRequired
};

export default SearchResult;
