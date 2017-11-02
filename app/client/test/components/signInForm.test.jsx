import React from 'react';
import { shallow } from 'enzyme';
import TextField from '../../components/common/FormTextField';
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

  it('should mount with onSignInClick()', () => {
    const event = { preventDefault: jest.fn() };
    const onSignInClickSpy = jest.spyOn(signInForm().instance(), 'onSignInClick');
    signInForm().instance().onSignInClick(event);
    expect(onSignInClickSpy).toHaveBeenCalledTimes(1);
  });

  it('should always render the sign in form', () => {
    expect(signInForm().find('form').hasClass('auth-form')).toBe(true);
    expect(signInForm().find(TextField).length).toBe(2);
  });

  it('should call onSignInClick() when the form is submitted', () => {
    const submitButton = signInForm().find('.auth-btn');
    const event = { preventDefault: jest.fn() };
    const signInSubmitSpy = jest.spyOn(signInForm().instance(), 'onSignInClick');
    submitButton.simulate('click', event);
    expect(signInSubmitSpy.mock.calls.length).toBe(2);
  });
});
