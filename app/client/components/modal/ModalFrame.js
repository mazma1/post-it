import React from 'react';

const ModalFrame = (props) => {
  // Render nothing if the "show" prop is false
  if (!props.show) {
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
