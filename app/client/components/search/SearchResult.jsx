import React from 'react';
import SearchResultTable from '../tables/SearchResultTable.jsx';

const SearchResult = (props) => (
  <div>
    <SearchResultTable searchQuery={props.searchQuery} />
  </div>
);

export default SearchResult;
