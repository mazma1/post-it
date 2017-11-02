import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import PageNotFound from '../../components/PageNotFound';

let mountedPageNotFound;
const pageNotFound = () => {
  if (!mountedPageNotFound) {
    mountedPageNotFound = mount(
      <MemoryRouter>
        <PageNotFound />
      </MemoryRouter>
    );
  }
  return mountedPageNotFound;
};

describe('<PageNotFound />', () => {
  it('should mount and render itself', () => {
    expect(pageNotFound().find('h4').text()).toBe('Sorry, this page is not available');
    expect(pageNotFound().find('h5').text()).toBe('The link you followed may be broken, or the page may have been removed');
  });
});
