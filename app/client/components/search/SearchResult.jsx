import React from 'react';
import SearchResultTable from '../tables/SearchResultTable';

const SearchResult = (props) => (
  <div>
    <SearchResultTable searchQuery={props.searchQuery} />
  </div>
);

export default SearchResult;
