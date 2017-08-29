import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import ClientFrame from '../client-frame/ClientFrame.jsx';
import TextField from '../common/FormTextField.jsx';
import SearchResult from '../search/SearchResult.jsx';
import { searchUser, resetSearch } from '../../actions/SearchUser';
import { SubmitButton } from '../modal/SubModals.jsx';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKeyword: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSearchSubmit(event) {
    event.preventDefault();
    this.props.searchUser({ searchKeyword: this.state.searchKeyword });
  }

  resetSearch(event) {
    event.preventDefault();
    this.props.resetSearch();
    this.props.history.push('/message_board');
  }

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
                <button className="close" onClick={this.resetSearch}><span>&times;</span></button>
                <hr />
                <form className="col s12 auth-form" onSubmit={this.onSearchSubmit}>
                  <div className="row">
                    <div className={classnames('input-field', 'auth-field', 'col l12 m6 s12', { 'has-error': error })}>
                      <TextField
                        icon='perm_identity'
                        label='Enter Search Keyword'
                        onChange={this.onChange}
                        error={error}
                        value={this.state.searchKeyword}
                        field='searchKeyword'
                        autocomplete='off'
                      />
                    </div>
                  </div>
                </form>
                <SubmitButton onSubmit={this.onSearchSubmit}/>
              </div>
            </div>
          </div>
        </div>

        {searchResult.isLoading === false && !error ? <SearchResult/> : null }
      </ClientFrame>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchResult: state.searchResult
  };
}

export default connect(mapStateToProps, { searchUser, resetSearch })(SearchForm);
