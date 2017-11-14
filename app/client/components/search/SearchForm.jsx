import React, { Component } from 'react';
import toastr from 'toastr';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import TextField from '../partials/FormTextField';
import { SubmitButton } from '../modal/SubModals';
import SearchResult from '../search/SearchResult';
import ClientFrame from '../client-frame/ClientFrame';
import { searchUser, resetSearch } from '../../actions/search';


/**
 * Displays form for searching for registered users
 *
 * @class SearchForm
 *
 * @extends {React.Component}
 */
export class SearchForm extends Component {

  /**
   * Creates an instance of SearchForm
   *
   * @param {object} props
   *
   * @memberof SearchForm
   */
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }

  /**
   * Handles change event of search form
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void} null
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Submits a search query to the database
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void} null
   */
  onSearchSubmit(event) {
    event.preventDefault();
    this.props.searchUser({
      searchQuery: this.state.searchQuery
    }).catch(() => {
      toastr.error('Unable to search for user, please try again');
    });
  }

  /**
   * Clears previous search result when the search page is closed
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void} null
   */
  resetSearch(event) {
    event.preventDefault();
    this.props.resetSearch();
    this.props.history.push(`/message-board/${localStorage.getItem('group')}`);
    localStorage.removeItem('group');
  }

  /**
   * Renders the search form, as well as the search result
   *
   * @returns {ReactElement} Search Form and Search Result markup
   */
  render() {
    const { searchResult } = this.props;
    const error = this.props.searchResult.error;
    return (
      <ClientFrame>
        <div className="row search-form">
          <div className="col s12 m10 offset-m1 search-form-inner">
            <div className="card search-card">
              <div className="card-content">
                <span className="card-title">Search for User</span>
                <button
                  className="close"
                  onClick={this.resetSearch}
                >
                  <span>&times;</span>
                </button>
                <hr />
                <form
                  className="col s12 auth-form"
                  onSubmit={this.onSearchSubmit}
                >
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
                        type="text"
                        label="Enter Search Query"
                        onChange={this.onChange}
                        error={error}
                        value={this.state.searchQuery}
                        field="searchQuery"
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

        {
          searchResult.isLoading === false && !error ?
            <SearchResult searchQuery={this.state.searchQuery} />
          : null
        }
      </ClientFrame>
    );
  }
}

/**
 * Maps pieces of the redux state to props
 *
 * @param {object} state Redux state
 *
 * @returns {object} search result
 */
function mapStateToProps(state) {
  return {
    searchResult: state.searchResult
  };
}

SearchForm.propTypes = {
  history: PropTypes.object.isRequired,
  searchUser: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  searchResult: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps, { searchUser, resetSearch })(SearchForm);
