import React from 'react';
import PropTypes from 'prop-types';


/**
 * Redenders specified data in a tabular form
 *
 * @param {object} props
 *
 * @returns {JSX} Table markup
 */
const Table = props => (
  <div>
    <table className="striped">
      { props.head ?
        <thead>
          {props.head}
        </thead>
        : null
      }
      <tbody>
        {props.body}
      </tbody>
    </table>
  </div>
);

Table.propTypes = {
  head: PropTypes.object,
  body: PropTypes.array.isRequired
};

Table.defaultProps = {
  head: null
};

export default Table;
