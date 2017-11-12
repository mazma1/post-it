import React from 'react';
import { mount } from 'enzyme';
import Table from '../../components/tables/Table';
import ReadByTable from '../../components/tables/ReadByTable';

let props;
let mountedReadByTable;
const readByTable = () => {
  if (!mountedReadByTable) {
    mountedReadByTable = mount(
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
    const tableDisplay = readByTable().find(Table);
    expect(tableDisplay.find('#readBy').text()).toBe('@mazma');
  });
});
