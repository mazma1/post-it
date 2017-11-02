import React from 'react';
import { shallow } from 'enzyme';
import ClientFrame from '../../components/client-frame/ClientFrame';
import Sidebar from '../../components/client-frame/sidebar/Sidebar';
import Header from '../../components/client-frame/Header';

describe('<ClientFrame />', () => {
  let mountedClientFrame;

  const clientFrame = () => {
    if (!mountedClientFrame) {
      mountedClientFrame = shallow(
        <ClientFrame />
      );
    }
    return mountedClientFrame;
  };

  beforeEach(() => {
    mountedClientFrame = undefined;
  });

  // All tests will go here
  it('should always render a wrapping div', () => {
    const divs = clientFrame().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  describe('rendered wrapping div', () => {
    it('should contain everything else that gets rendered', () => {
      const divs = clientFrame().find('div');
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(clientFrame().children());
    });
  });

  it('should always render <Sidebar/>', () => {
    expect(clientFrame().find(Sidebar).length).toBe(1);
  });

  it('should always render <Header/>', () => {
    expect(clientFrame().find(Header).length).toBe(1);
  });
});
