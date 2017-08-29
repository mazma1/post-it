import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';


class SearchResultTable extends React.Component {
  render() {
    const users = this.props.searchResult.users;
    let searchResultRow;

    if (!isEmpty(users)) {
      searchResultRow = users.map((user, index) => (
        <tr key={index}>
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
              <th width='20%'>First Name</th>
              <th width='20%'>Last Name</th>
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

function mapStateToProps(state) {
  return {
    searchResult: state.searchResult
  };
}

SearchResultTable.propTypes = {
  searchResult: PropTypes.object
};

export default connect(mapStateToProps)(SearchResultTable);
