import React from 'react';
import { shallow } from 'enzyme';
import { HomePage } from '../../components/home-page/HomePage';

describe('<HomePage />', () => {
  let mountedHomepage;
  let props;
  const homepage = () => {
    if (!mountedHomepage) {
      mountedHomepage = shallow(
        <HomePage {...props} />
      );
    }
    return mountedHomepage;
  };

  beforeEach(() => {
    props = {
      googleSignIn: jest.fn(() => Promise.resolve()),
      authorizeGoogleUser: jest.fn(() => Promise.resolve()),
      history: { push: jest.fn() }
    };
  });

  it('should mount with googleSignIn()', () => {
    const response = { tokenId: '', profileObj: { email: '' } };
    const googleSignInSpy = jest.spyOn(homepage().instance(), 'googleSignIn');
    homepage().instance().googleSignIn(response);
    expect(googleSignInSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount and render itself', () => {
    expect(homepage().find('h2').text()).toBe('Welcome to PostIT!');
    expect(homepage().find('h4').hasClass('index-line-height')).toBe(true);
    expect(homepage().find('h4').text()).toBe(
      'Post It is a simple application that allows you keep in touch with people that matter.'
    );
  });
});
