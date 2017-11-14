import React from 'react';
import { shallow } from 'enzyme';
import TextField from '../../components/partials/FormTextField';
import { SignUpForm } from '../../components/sign-up/SignUpForm';


describe('<SignUpForm />', () => {
  let mountedSignUpForm;
  let props;
  const signUpForm = () => {
    if (!mountedSignUpForm) {
      mountedSignUpForm = shallow(
        <SignUpForm {...props} />
      );
    }
    return mountedSignUpForm;
  };

  beforeEach(() => {
    props = {
      userSignUpRequest: jest.fn(() => Promise.resolve()),
      userSignInRequest: jest.fn(() => Promise.resolve()),
      history: { push: jest.fn() }
    };
  });

  it('should mount with onChange()', () => {
    const event = { target: { } };
    const onChangeSpy = jest.spyOn(signUpForm().instance(), 'onChange');
    signUpForm().instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with onSignUpClick()', () => {
    const event = { preventDefault: jest.fn() };
    const onSignUpClickSpy = jest.spyOn(signUpForm().instance(), 'onSignUpClick');
    signUpForm().instance().onSignUpClick(event);
    expect(onSignUpClickSpy).toHaveBeenCalledTimes(1);
  });

  it('should always render the sign up form', () => {
    expect(signUpForm().find('form').hasClass('auth-form')).toBe(true);
    expect(signUpForm().find(TextField).length).toBe(7);
  });

  it('should call signUpClick() when the form is submitted', () => {
    const submitButton = signUpForm().find('a');
    const event = { preventDefault: jest.fn() };
    const signUpSubmitSpy = jest.spyOn(signUpForm().instance(), 'onSignUpClick');
    submitButton.simulate('click', event);
    expect(signUpSubmitSpy.mock.calls.length).toBe(2);
  });
});
