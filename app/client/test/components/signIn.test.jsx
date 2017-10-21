import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { SignIn } from '../../components/sign-in/SignIn';
import { SignInForm } from '../../components/sign-in/SignInForm';

let mountedSignIn;
const props = {
  userSignInRequest: jest.fn(() => Promise.resolve())
};
const signIn = () => {
  if (!mountedSignIn) {
    mountedSignIn = mount(
      <MemoryRouter>
        <SignIn {...props} />
      </MemoryRouter>
    );
  }
  return mountedSignIn;
};

describe('<SignIn />', () => {
  it('should render <SignInForm /> with userSignInRequest as a prop', () => {
    expect(signIn().find('h5').text()).toBe('Sign In | Post It');
    expect(signIn().find(SignInForm).length).toBe(1);

    const SignInDisplay = signIn().find(SignInForm);
    expect(SignInDisplay.props().userSignInRequest);
  });
});
