import React from 'react';
import { shallow } from 'enzyme';
import { SearchResultTable } from '../../components/tables/SearchResultTable';

let props;
let mountedSearchResultTable;
const searchResultTable = () => {
  if (!mountedSearchResultTable) {
    mountedSearchResultTable = shallow(
      <SearchResultTable {...props} />
    );
  }
  return mountedSearchResultTable;
};

describe('<SearchResultTable />', () => {
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
    const handlePageClickSpy = jest.spyOn(searchResultTable().instance(), 'handlePageClick');
    searchResultTable().instance().handlePageClick(page);
    expect(handlePageClickSpy).toHaveBeenCalledTimes(1);
  });

  it('should render search results if at least one user was found', () => {
    expect(searchResultTable().find('#firstName').text()).toBe('Mary');
    expect(searchResultTable().find('#lastName').text()).toBe('Mazi');
  });
});
