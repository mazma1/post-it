import React from 'react';
import { shallow } from 'enzyme';
import { SignIn } from '../../components/sign-in/SignIn';


describe('<SignIn />', () => {
  const props = {
    userSignInRequest: jest.fn(() => Promise.resolve()),
    authorizeGoogleUser: jest.fn()
  };

  it('should mount with googleSignIn()', () => {
    const component = shallow(<SignIn {...props} />);
    const response = { tokenId: '', profileObj: { email: '' } };
    const googleSignInSpy = jest.spyOn(component.instance(), 'googleSignIn');
    component.instance().googleSignIn(response);
    expect(googleSignInSpy).toHaveBeenCalledTimes(1);
  });

  it('should mount with onFailure()', () => {
    const component = shallow(<SignIn {...props} />);
    const onFailureSpy = jest.spyOn(component.instance(), 'onFailure');
    component.instance().onFailure();
    expect(onFailureSpy).toHaveBeenCalledTimes(1);
  });
});
