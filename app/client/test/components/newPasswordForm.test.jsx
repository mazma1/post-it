import React from 'react';
import { shallow } from 'enzyme';
import TextField from '../../components/partials/FormTextField';
import { NewPasswordForm } from '../../components/reset-password/NewPasswordForm';

describe('<NewPasswordForm />', () => {
  let mountedNewPasswordForm;
  let props;
  const newPasswordForm = () => {
    if (!mountedNewPasswordForm) {
      mountedNewPasswordForm = shallow(
        <NewPasswordForm {...props} />
      );
    }
    return mountedNewPasswordForm;
  };

  beforeEach(() => {
    props = {
      updatePassword: jest.fn(() => Promise.resolve()),
      validateResetPasswordToken: jest.fn(() => Promise.resolve()),
      history: { push: jest.fn() },
      match: { params: { token: '6789iughjmnb' } },
    };
  });

  it('should mount with onChange()', () => {
    const event = { target: { password: '123456' } };
    const onChangeSpy = jest.spyOn(newPasswordForm().instance(), 'onChange');
    newPasswordForm().instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with submitNewpassword()', () => {
    const event = { preventDefault: jest.fn() };
    const submitNewPasswordSpy = jest.spyOn(newPasswordForm().instance(), 'submitNewPassword');
    newPasswordForm().instance().submitNewPassword(event);
    expect(submitNewPasswordSpy).toHaveBeenCalledTimes(1);
  });

  it('should always render the form for user to enter new password of choice', () => {
    expect(newPasswordForm().find('form').hasClass('auth-form')).toBe(true);
    expect(newPasswordForm().find('h5').text()).toBe('Enter New Password');
    expect(newPasswordForm().find(TextField).length).toBe(2);
  });

  it('should call submitNewPassword() when the form is submitted', () => {
    const updatePasswordButton = newPasswordForm().find('a');
    const event = { preventDefault: jest.fn() };
    const submitNewPasswordSpy = jest.spyOn(newPasswordForm().instance(), 'submitNewPassword');
    updatePasswordButton.simulate('click', event);
    expect(submitNewPasswordSpy.mock.calls.length).toBe(2);
  });
});
