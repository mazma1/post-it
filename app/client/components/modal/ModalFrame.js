import React from 'react';

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

export default ModalFrame;
