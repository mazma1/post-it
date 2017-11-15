import React from 'react';
import { shallow } from 'enzyme';
import TextField from '../../components/partials/FormTextField';
import {
  SubmitEmailForm
} from '../../components/reset-password/SubmitEmailForm';

describe('<SubmitEmailForm />', () => {
  let props;
  let mountedSubmitEmailForm;
  const emailForm = () => {
    if (!mountedSubmitEmailForm) {
      mountedSubmitEmailForm = shallow(
        <SubmitEmailForm {...props} />
      );
    }
    return mountedSubmitEmailForm;
  };
  props = {
    resetLinkRequest: jest.fn(() => Promise.resolve())
  };

  it('should mount with onChange()', () => {
    const event = { target: { email: 'me@yahoo.com' } };
    const onChangeSpy = jest.spyOn(emailForm().instance(), 'onChange');
    emailForm().instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with submitResetRequest()', () => {
    const event = { preventDefault: jest.fn() };
    const submitResetRequestSpy = jest.spyOn(emailForm().instance(), 'submitResetRequest');
    emailForm().instance().submitResetRequest(event);
    expect(submitResetRequestSpy).toHaveBeenCalledTimes(1);
  });

  it('should always render the form for user to enter registered email address to recover password', () => {
    expect(emailForm().find('form').hasClass('auth-form')).toBe(true);
    expect(emailForm().find('h5').text()).toBe('Request Password Reset');
    expect(emailForm().find(TextField).length).toBe(1);
  });

  it('should call submitResetRequest() when the form is submitted', () => {
    const requestResetButton = emailForm().find('button');
    const event = { preventDefault: jest.fn() };
    const submitResetRequestSpy = jest.spyOn(emailForm().instance(), 'submitResetRequest');
    requestResetButton.simulate('click', event);
    expect(submitResetRequestSpy.mock.calls.length).toBe(2);
  });

  it('should pass a typed email value to the onChange handler', () => {
    const targetMock = {
      target: { email: 'me@yahoo.com' },
    };
    const onChangeSpy = jest.spyOn(emailForm().instance(), 'onChange');

    emailForm().find(TextField).simulate('change', targetMock);
    expect(onChangeSpy).toBeCalledWith(targetMock);
  });
});
