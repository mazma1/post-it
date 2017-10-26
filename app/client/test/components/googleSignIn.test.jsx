import React from 'react';
import { shallow } from 'enzyme';
import { GoogleSignIn } from '../../components/sign-in/GoogleSignIn';

describe('<GoogleSignIn />', () => {
  let mountedGoogleSignIn;
  let props;

  const googleSignIn = () => {
    if (!mountedGoogleSignIn) {
      mountedGoogleSignIn = shallow(
        <GoogleSignIn {...props} />
      );
    }
    return mountedGoogleSignIn;
  };

  beforeEach(() => {
    props = {
      googleSignIn: jest.fn(() => Promise.resolve()),
      token: '',
      history: { push: jest.fn() }
    };
  });

  it('should mount with onChange()', () => {
    const event = { target: {} };
    const onChangeSpy = jest.spyOn(googleSignIn().instance(), 'onChange');
    googleSignIn().instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with submitPhoneNumber()', () => {
    const event = { preventDefault: jest.fn() };
    const submitPhoneNumberSpy = jest.spyOn(googleSignIn().instance(), 'submitPhoneNumber');
    googleSignIn().instance().submitPhoneNumber(event);
    expect(submitPhoneNumberSpy).toHaveBeenCalledTimes(1);
  });
});
