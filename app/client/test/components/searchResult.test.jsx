import React from 'react';
import { shallow } from 'enzyme';
import SearchResult from '../../components/search/SearchResult';
import SearchResultTable from '../../components/tables/SearchResultTable';

let mountedSearchResult;
const props = {
  searchQuery: 'mazma'
};
const searchResult = () => {
  if (!mountedSearchResult) {
    mountedSearchResult = shallow(
      <SearchResult {...props} />
    );
  }
  return mountedSearchResult;
};

describe('<SearchResult />', () => {
  it('should always render <SearchResultTable />', () => {
    expect(searchResult().find(SearchResultTable).length).toBe(1);
  });
});
