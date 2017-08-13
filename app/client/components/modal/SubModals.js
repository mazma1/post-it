import React from 'react';
import classnames from 'classnames';

export const ModalHeader = (props) => {
  return (
    <div className="modal-header">
      <button
        type="button"
        className="close"
        data-dismiss="modal"
        aria-label="Close"
        onClick={props.onClose}>
        <span aria-hidden="true">&times;</span>
      </button>
      <h4 className="modal-title">{props.header}</h4>
    </div>
  );
};

export const ModalBody = (props) => {
  const error = props.errors.error;
  return (
    <div className="modal-body">
      <div className="row">
        <form className="col s12" onSubmit={props.onSubmit}>
          <div className="row">
            <div className={classnames('input-field', 'auth-field', 'col s12', { 'has-error': error })}>
              <input
                type="text"
                className={ classnames('validate', { 'invalid': error })}
                name={props.field}
                value={props.value}
                onChange={props.onChange}
              />
              <label>{props.label}</label>
              {error && <span className="help-block modal-help-block">{error}</span>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export const CloseButton = (props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      aria-label="Close"
      data-dismiss="modal"
      className="btn waves-effect waves-light blue lighten-1"
    >
      Close
    </button>
  );
};

export const CancelButton = (props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      aria-label="Close"
      data-dismiss="modal"
      className="btn waves-effect waves-light red darken-2 modal-cancel-btn"
    >
      Cancel
    </button>
  );
};

export const SubmitButton = (props) => {
  return (
    <button
      type="button"
      disabled={props.isLoading}
      className="btn waves-effect waves-light blue lighten-1"
      onClick={props.onSubmit}>
      Submit
    </button>
  );
};

export const ModalFooter = (props) => {
  return (
    <div className="modal-footer">

      { props.children }

    </div>
  );
};



