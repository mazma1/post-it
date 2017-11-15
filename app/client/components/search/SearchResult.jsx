import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Pagination from '../Pagination';
import { searchUser } from '../../actions/search';
import Table from '../tables/Table';

/**
 * Displays search result
 *
 * @class SearchResult
 *
 * @extends {React.Component}
 */
export class SearchResult extends React.Component {

  /**
   * Creates an instance of SearchResult
   *
   * @param {object} props
   *
   * @memberof SearchResult
   */
  constructor(props) {
    super(props);

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  /**
   * Handles click on change of page
   *
   * @param {object} page
   *
   * @returns {void}
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
   * Renders component
   *
   * @returns {ReactElement} Search result markup
   */
  render() {
    const users = this.props.searchResult.users;
    let searchResultRow;

    const header = (
      <tr>
        <th width="20%">First Name</th>
        <th width="20%">Last Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Groups</th>
      </tr>
    );

    if (!isEmpty(users)) {
      searchResultRow = users.map(user => (
        <tr key={user.id}>
          <td id="firstName">
            {user.firstName}
          </td>
          <td id="lastName">
            {user.lastName}
          </td>
          <td>
            {user.email}
          </td>
          <td>
            {user.phoneNumber}
          </td>
          <td>
            {user.groups.length}
          </td>
        </tr>
      ));
    }

    return (
      <div className="col-sm-12 col-md-10 col-md-offset-1 search-result">
        <h5>Search Result</h5>
        <Table head={header} body={searchResultRow} />
        {
          this.props.searchResult.users.length > 0 ?
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
 *
 * @param {object} state Redux state
 *
 * @returns {object} Search result
 */
function mapStateToProps(state) {
  return {
    searchResult: state.searchResult
  };
}

SearchResult.propTypes = {
  searchResult: PropTypes.object.isRequired,
  searchUser: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired
};

export default connect(mapStateToProps, { searchUser })(SearchResult);
