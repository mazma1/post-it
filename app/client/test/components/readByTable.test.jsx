import React from 'react';
import { shallow } from 'enzyme';
import ReadByTable from '../../components/tables/ReadByTable';

let props;
let mountedReadByTable;
const readByTable = () => {
  if (!mountedReadByTable) {
    mountedReadByTable = shallow(
      <ReadByTable {...props} />
    );
  }
  return mountedReadByTable;
};

describe('<ReadByTable />', () => {
  beforeEach(() => {
    props = {
      messages: [
        {
          id: 1,
          message: 'Hello',
          readBy: 'mazma'
        }
      ],
      messageId: 1
    };
  });

  it('should render user(s) that have read a message', () => {
    expect(readByTable().find('#readBy').text()).toBe('@mazma');
  });
});
