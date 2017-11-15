import React from 'react';
import { shallow } from 'enzyme';
import MockLocalStorage from '../MockLocalStorage';
import TextField from '../../components/partials/FormTextField';
import { SearchForm } from '../../components/search/SearchForm';
import { SubmitButton } from '../../components/modal/SubModals';

Object.defineProperty(window, 'localStorage', { value: MockLocalStorage });

describe('<SearchForm />', () => {
  let mountedSearchForm;
  let props;
  const searchForm = () => {
    if (!mountedSearchForm) {
      mountedSearchForm = shallow(
        <SearchForm {...props} />
      );
    }
    return mountedSearchForm;
  };

  beforeEach(() => {
    props = {
      searchUser: jest.fn(() => Promise.resolve()),
      resetSearch: jest.fn(() => Promise.resolve()),
      searchResult: { error: '' },
      history: { push: jest.fn() },
      match: { params: { token: '6789iughjmnb' } },
    };
  });

  it('should mount with onChange()', () => {
    const event = { target: { searchQuery: 'mazma' } };
    const onChangeSpy = jest.spyOn(searchForm().instance(), 'onChange');
    searchForm().instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with onSearchSubmit()', () => {
    const event = { preventDefault: jest.fn() };
    const onSearchSubmitSpy = jest.spyOn(searchForm().instance(), 'onSearchSubmit');
    searchForm().instance().onSearchSubmit(event);
    expect(onSearchSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with resetSearch()', () => {
    const event = { preventDefault: jest.fn() };
    const resetSearchSpy = jest.spyOn(searchForm().instance(), 'resetSearch');
    searchForm().instance().resetSearch(event);
    expect(resetSearchSpy).toHaveBeenCalledTimes(1);
  });

  it('should always render the search form', () => {
    expect(searchForm().find('form').hasClass('auth-form')).toBe(true);
    expect(searchForm().find('.card-title').text()).toBe('Search for User');
    expect(searchForm().find(TextField).length).toBe(1);
  });

  it('should call onSearchSubmit() when the form is submitted', () => {
    const submitButton = searchForm().find(SubmitButton);
    const event = { preventDefault: jest.fn() };
    const onSearchSubmitSpy = jest.spyOn(searchForm().instance(), 'onSearchSubmit');
    submitButton.simulate('click', event);
    expect(onSearchSubmitSpy.mock.calls.length).toBe(1);
  });
});
