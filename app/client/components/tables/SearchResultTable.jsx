import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Pagination from '../Pagination.jsx';
import { searchUser } from '../../actions/searchUser';

/** Table of search result */
class SearchResultTable extends React.Component {

  constructor(props) {
    super(props);

    this.handlePageClick = this.handlePageClick.bind(this);
  }  

  /**
   * handles click on change of page
   * @param {object} page
   * @returns {void}
   * @memberOf Users
   */
  handlePageClick(page) {
    const selected = page.selected;
    const limit = 1;
    const offset = Math.ceil(selected * limit);
    this.setState({ offset });
    this.props.searchUser({
      offset,
      limit,
      searchQuery: this.props.searchQuery
    });
  }


  /**
   * Render
   * @returns {ReactElement} Search table markup
   */
  render() {
    const users = this.props.searchResult.users;
    let searchResultRow;

    if (!isEmpty(users)) {
      searchResultRow = users.map(user => (
        <tr key={user.id}>
          <td>
            {user.firstName}
          </td>
          <td>
            {user.lastName}
          </td>
          <td>
            {user.email}
          </td>
          <td>
            {user.phoneNumber}
          </td>
          <td>
            {user.groups.map(group => (
              <ul key={group.id}>
                <li>{group.groupName}</li>
              </ul>
            ))}
          </td>
        </tr>
      ));
    }

    return (
      <div className="col-sm-12 col-md-10 col-md-offset-1 search-result">
        <h5>Search Result</h5>
        <table className="striped">
          <thead>
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
        {this.props.searchResult.users.length > 0 ?
          <Pagination
            pageCount={this.props.searchResult.pagination.totalRows}
            handlePageClick={this.handlePageClick}
          />
          : ''}
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

export default connect(mapStateToProps, { searchUser })(SearchResultTable);
