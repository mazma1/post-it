import React from 'react';
import { mount, shallow } from 'enzyme';
import Table from '../../components/tables/Table';
import { SearchResult } from '../../components/search/SearchResult';

let props;
let mountedSearchResult;
const searchResult = () => {
  if (!mountedSearchResult) {
    mountedSearchResult = mount(
      <SearchResult {...props} />
    );
  }
  return mountedSearchResult;
};

describe('<SearchResult />', () => {
  beforeEach(() => {
    props = {
      searchUser: jest.fn(() => Promise.resolve()),
      searchResult: {
        users: [
          {
            id: 1,
            firstName: 'Mary',
            lastName: 'Mazi',
            email: 'me@yahoo.com',
            phoneNumber: '080987655342',
            groups: []
          }
        ],
        pagination: {
          totalRows: 1
        }
      },
      searchQuery: 'mazma'
    };
  });

  it('should mount with handlePageClick()', () => {
    const page = { selected: 1 };
    const handlePageClickSpy = jest.spyOn(searchResult().instance(), 'handlePageClick');
    searchResult().instance().handlePageClick(page);
    expect(handlePageClickSpy).toHaveBeenCalledTimes(1);
  });

  it('should render search results if at least one user was found', () => {
    const tableDisplay = searchResult().find(Table);
    expect(tableDisplay.find('#firstName').text()).toBe('Mary');
    expect(tableDisplay.find('#lastName').text()).toBe('Mazi');
  });
});
