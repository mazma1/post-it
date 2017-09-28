import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { SignUp } from '../../components/sign-up/SignUp';
import { SignUpForm } from '../../components/sign-up/SignUpForm';

let props;
let mountedSignUp;
const signUp = () => {
  if (!mountedSignUp) {
    mountedSignUp = mount(
      <MemoryRouter>
        <SignUp {...props} />
      </MemoryRouter>
    );
  }
  return mountedSignUp;
};

describe('<SignUp />', () => {
  beforeEach(() => {
    props = {
      userSignUpRequest: jest.fn(),
      userSignInRequest: jest.fn()
    };
  });

  it('should mount <SignUpForm /> with two props', () => {
    expect(signUp().find('h5').text()).toBe('Sign up | Post It');
    expect(signUp().find(SignUpForm).length).toBe(1);

    // const SignUpDisplay = signUp().find(SignUpForm);
    // expect(Object.keys(SignUpDisplay.props()).length).toBe(2);
  });
});
