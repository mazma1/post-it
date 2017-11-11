import React from 'react';
import PropTypes from 'prop-types';
import split from 'lodash/split';
import mapKeys from 'lodash/mapKeys';
import Table from '../tables/Table';


/**
  * Displays table of users that have read a message
  *
  * @class ReadBytTable
  *
  * @extends {React.Component}
  */
const ReadByTable = (props) => {
  const messagesArray = props.messages;
  const messagesObject = mapKeys(messagesArray, 'id');
  const messageId = props.messageId;
  const message = messagesObject[messageId];
  let readByRow;

  if (message) {
    const { readBy } = message;
    const readByArray = split(readBy, ',');

    readByRow = readByArray.map((username, index) => (
      <tr key={index}>
        <td id="readBy">
          @{username}
        </td>
      </tr>
    ));
  }

  return (
    <div>
      <Table body={readByRow} />
    </div>
  );
};

ReadByTable.propTypes = {
  messageId: PropTypes.number.isRequired,
  messages: PropTypes.array.isRequired
};

export default ReadByTable;
