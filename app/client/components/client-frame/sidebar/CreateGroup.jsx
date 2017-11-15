import React, { Component } from 'react';
import toastr from 'toastr';
import classnames from 'classnames';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { PropTypes } from 'prop-types';
import TextField from '../../partials/FormTextField';
import { SubmitButton } from '../../modal/SubModals';
import ClientFrame from '../../client-frame/ClientFrame';
import { submitNewGroup } from '../../../actions/userGroups';


/**
 * Displays form for creating a new group
 *
 * @class CreateGroup
 *
 * @extends {React.Component}
 */
export class CreateGroup extends Component {

  /**
   * Creates an instance of CreateGroup
   *
   * @param {object} props
   *
   * @memberof CreateGroup
   */
  constructor(props) {
    super(props);

    this.state = {
      newGroup: '',
      error: {}
    };

    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.submitNewGroup = this.submitNewGroup.bind(this);
  }

  /**
    * Handles change event of create group form
    *
    * @param {SyntheticEvent} event
    *
    * @returns {void} null
    */
  onChange(event) {
    this.setState({ newGroup: event.target.value, error: {} });
  }


  /**
   * Handles input validation for creating new group
   *
   * @returns {boolean} If an input is valid or not
   */
  isValid() {
    const error = {};
    if (!this.state.newGroup) {
      error.error = 'Group name is required';
      this.setState({ error });
    }
    if (this.state.newGroup.trim().length === 0) {
      error.error = 'Group name cannot be empty';
      this.setState({ error });
    }
    return isEmpty(error);
  }


  /**
   * Adds a new group record to the database
   *
   * @param {SyntheticEvent} event
   *
   * @returns {void}
   */
  submitNewGroup(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ error: {}, isLoading: true });
      this.props.submitNewGroup({
        groupName: this.state.newGroup,
        userId: this.props.signedInUser.user.id
      }).then(
        () => {
          this.setState({ isLoading: false });
          toastr.success('Your group has been successfully created');
          this.props.history.push(`${this.props.newGroupId}`);
        },
        ({ response }) => {
          this.setState({ error: response.data, isLoading: false });
        }
        );
    }
  }


  /**
   * Renders Create Group page
   *
   * @returns {ReactElement} Create Group markup
   */
  render() {
    const { error } = this.state.error;
    const { previousPath } = this.props.location.state;
    return (
      <ClientFrame>
        <div className="row search-form">
          <div className="col s12 m10 offset-m1 search-form-inner">
            <div className="card search-card">
              <div className="card-content">
                <span className="card-title">Create New Group</span>
                <button
                  className="close"
                  id="close-button"
                  onClick={() => this.props.history.push(`${previousPath}`)}
                >
                  <span>&times;</span>
                </button>
                <hr />
                <form
                  className="col s12 auth-form"
                  onSubmit={this.submitNewGroup}
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
                        icon="group"
                        type="text"
                        label="Enter Group Name"
                        onChange={this.onChange}
                        error={error}
                        value={this.state.newGroup}
                        field="newGroup"
                        autocomplete="off"
                        onSubmit={this.submitNewGroup}
                      />
                    </div>
                  </div>
                </form>
                <SubmitButton onSubmit={this.submitNewGroup} />
              </div>
            </div>
          </div>
        </div>
      </ClientFrame>
    );
  }
}

/**
 * Maps pieces of the redux state to props in CreateGroup
 *
 * @param {object} state - Redux state
 *
 * @returns {object} Details of signed in user and groups he belongs to
 */
function mapStateToProps(state) {
  return {
    signedInUser: state.signedInUser,
    groups: state.userGroups.groups,
    newGroupId: state.newGroup.groupId
  };
}

CreateGroup.propTypes = {
  location: PropTypes.object.isRequired,
  submitNewGroup: PropTypes.func.isRequired,
  signedInUser: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  newGroupId: PropTypes.number
};

CreateGroup.defaultProps = {
  newGroupId: 0
};

export default connect(mapStateToProps, { submitNewGroup })(CreateGroup);
