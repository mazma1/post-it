import React from 'react';

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
  return (
    <div className="modal-body">
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                className="validate"
                name={props.field}
                value={props.value}
                onChange={props.onChange}
              />
              <label>{props.label}</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export const CancelButton = (props) => {
  return (
    <button
      type="button"
      data-dismiss="modal"
      aria-label="Close"
      className="btn waves-effect waves-light red darken-2 modal-cancel-btn"
      onClick={props.onClick}>
      Cancel
    </button>
  );
};

export const SubmitButton = (props) => {
  return (
    <a
      type="button"
      className="btn waves-effect waves-light blue lighten-1"
      onClick={ () => console.log('submit working') }>
      Submit
    </a>
  );
};

export const ModalFooter = (props) => {
  return (
    <div className="modal-footer">

      { props.children }

    </div>
  );
};



