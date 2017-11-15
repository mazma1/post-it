import React from 'react';
import { shallow } from 'enzyme';
import TextField from '../../components/partials/FormTextField';
import { SignInForm } from '../../components/sign-in/SignInForm';


describe('<SignInForm />', () => {
  let mountedSignInForm;
  let props;
  const signInForm = () => {
    if (!mountedSignInForm) {
      mountedSignInForm = shallow(
        <SignInForm {...props} />
      );
    }
    return mountedSignInForm;
  };

  beforeEach(() => {
    props = {
      userSignInRequest: jest.fn(() => Promise.resolve()),
      history: { push: jest.fn() }
    };
  });

  it('should mount with onChange()', () => {
    const event = { target: {} };
    const onChangeSpy = jest.spyOn(signInForm().instance(), 'onChange');
    signInForm().instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with onSubmit()', () => {
    const event = { preventDefault: jest.fn() };
    const onSubmitSpy = jest.spyOn(signInForm().instance(), 'onSubmit');
    signInForm().instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should always render the sign in form', () => {
    expect(signInForm().find('form').hasClass('auth-form')).toBe(true);
    expect(signInForm().find(TextField).length).toBe(2);
  });

  it('should call onSubmit() when the form is submitted', () => {
    const submitButton = signInForm().find('.auth-btn');
    const event = { preventDefault: jest.fn() };
    const signInSubmitSpy = jest.spyOn(signInForm().instance(), 'onSubmit');
    submitButton.simulate('click', event);
    expect(signInSubmitSpy.mock.calls.length).toBe(2);
  });
});
