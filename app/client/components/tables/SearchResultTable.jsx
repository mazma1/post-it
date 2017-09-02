import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

/** Table of search result */
class SearchResultTable extends React.Component {

  /**
   * Render
   * @returns {ReactElement} Search table markup
   */
  render() {
    const users = this.props.searchResult.users;
    let searchResultRow;

    if (!isEmpty(users)) {
      searchResultRow = users.map((user) => (
        <tr key={user.id}>
          <td>
            {user.firstname}
          </td>
          <td>
            {user.lastname}
          </td>
          <td>
            {user.email}
          </td>
          <td>
            {user.mobile}
          </td>
          <td>
            {user.group.map(group => (
              <ul key={group.id}>
                <li>{group.group_name}</li>
              </ul>
            ))}
          </td>
        </tr>
      ));
    }

    return (
      <div className="col-sm-12 col-md-10 col-md-offset-1">
        <table className="striped">
          <thead>
            <tr><h5>Search Result</h5></tr>
            <tr>
              <th width="20%">First Name</th>
              <th width="20%">Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Groups</th>
            </tr>
          </thead>
          <tbody>
            {searchResultRow}
          </tbody>
        </table>
      </div>
    );
  }
}

/**
 * Maps pieces of the redux state to props
 * @param {object} state Redux state
 * @returns {object} Search result
 */
function mapStateToProps(state) {
  return {
    searchResult: state.searchResult
  };
}

SearchResultTable.propTypes = {
  searchResult: PropTypes.object
};

export default connect(mapStateToProps)(SearchResultTable);
