import React from 'react';
import { shallow } from 'enzyme';
import { GoogleSignUp } from '../../components/sign-up/GoogleSignUp';

describe('<GoogleSignUp />', () => {
  let mountedGoogleSignUp;
  let props;

  const googleSignUp = () => {
    if (!mountedGoogleSignUp) {
      mountedGoogleSignUp = shallow(
        <GoogleSignUp {...props} />
      );
    }
    return mountedGoogleSignUp;
  };

  beforeEach(() => {
    props = {
      googleSignUp: jest.fn(() => Promise.resolve()),
      token: '',
      history: { push: jest.fn() },
      userSignUpRequest: { push: jest.fn() }
    };
  });

  it('should mount with onChange()', () => {
    const event = { target: {} };
    const onChangeSpy = jest.spyOn(googleSignUp().instance(), 'onChange');
    googleSignUp().instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with registerGoogleUser()', () => {
    const event = { preventDefault: jest.fn() };
    const registerGoogleUserSpy = jest.spyOn(googleSignUp().instance(), 'registerGoogleUser');
    googleSignUp().instance().registerGoogleUser(event);
    expect(registerGoogleUserSpy).toHaveBeenCalledTimes(1);
  });
});
