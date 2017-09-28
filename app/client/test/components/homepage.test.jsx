import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import HomePage from '../../components/home-page/HomePage';

let mountedHomepage;
const homepage = () => {
  if (!mountedHomepage) {
    mountedHomepage = mount(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  }
  return mountedHomepage;
};

describe('<HomePage />', () => {
  it('should mount and render itself', () => {
    expect(homepage().find('h2').text()).toBe('Welcome to PostIT!');
    expect(homepage().find('h4').hasClass('index-line-height')).toBe(true);
    expect(homepage().find('h4').text()).toBe(
      'Post It is a simple application that allows you keep in touch with people that matter.'
    );
  });
});
