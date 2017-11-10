import React from 'react';
import { PropTypes } from 'prop-types';


/**
  * Holds the sub elements of a modal
  *
  * @param {object} props
  *
  * @returns {JSX} Modal frame mark up
  */
const ModalFrame = (props) => {
  if (props.membersLoading) {
    return null;
  }
  return (
    <div id={props.id} className="modal fade" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">

          {props.children}

        </div>
      </div>
    </div>
  );
};

ModalFrame.propTypes = {
  membersLoading: PropTypes.bool,
  id: PropTypes.string.isRequired
};

ModalFrame.defaultProps = {
  membersLoading: false
};

export default ModalFrame;
