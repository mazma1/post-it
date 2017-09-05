import React, { Component } from 'react';
import classnames from 'classnames';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ClientFrame from '../client-frame/ClientFrame.jsx';
import TextField from '../common/FormTextField.jsx';
import SearchResult from '../search/SearchResult.jsx';
import { searchUser, resetSearch } from '../../actions/SearchUser';
import { SubmitButton } from '../modal/SubModals.jsx';

/** Form for searching for registered users */
class SearchForm extends Component {

  /**
   * Constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      searchKeyword: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }

  /**
   * Handles change event of new password form
   * Updates searchKeyword state
   * @param {SyntheticEvent} event
   * @returns {void} null
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Handles search request submit event
   * Dispatches search user action with provided search keyword
   * @param {SyntheticEvent} event
   * @returns {void} null
   */
  onSearchSubmit(event) {
    event.preventDefault();
    this.props.searchUser({
      searchKeyword: this.state.searchKeyword
    }).catch(() => {
      toastr.error('Unable to search for user, please try again');
    });
  }

  /**
   * Is called when the search page is closed to clear previous
   search result
   * @param {SyntheticEvent} event
   * @returns {void} null
   */
  resetSearch(event) {
    event.preventDefault();
    this.props.resetSearch();
    this.props.history.push('/message_board');
  }

  /**
   * Render
   * @returns {ReactElement} Search Result markup
   */
  render() {
    const { searchResult } = this.props;
    const error = this.props.searchResult.error;
    return (
      <ClientFrame>
        <div className="row search-form">
          <div className="col s12 m10 offset-m1 message-card">
            <div className="card search-card">
              <div className="card-content">
                <span className="card-title">Search for User</span>
                <button
                  className="close"
                  onClick={this.resetSearch}><span>&times;</span>
                </button>
                <hr />
                <form className="col s12 auth-form" onSubmit={this.onSearchSubmit}>
                  <div className="row">
                    <div
                      className={classnames(
                        'input-field',
                        'auth-field',
                        'col l12 m6 s12',
                        { 'has-error': error }
                      )}
                    >
                      <TextField
                        icon="perm_identity"
                        label="Enter Search Keyword"
                        onChange={this.onChange}
                        error={error}
                        value={this.state.searchKeyword}
                        field="searchKeyword"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                </form>
                <SubmitButton onSubmit={this.onSearchSubmit} />
              </div>
            </div>
          </div>
        </div>

        {searchResult.isLoading === false && !error ? <SearchResult /> : null }
      </ClientFrame>
    );
  }
}

/**
 * Maps pieces of the redux state to props
 * @param {object} state Redux state
 * @returns {object} search result
 */
function mapStateToProps(state) {
  return {
    searchResult: state.searchResult
  };
}

SearchForm.propTypes = {
  searchUser: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  searchResult: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { searchUser, resetSearch })(SearchForm);
