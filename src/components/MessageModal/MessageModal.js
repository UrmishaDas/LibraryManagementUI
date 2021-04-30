import React, { Component } from "react";
import "./MessageModal.css";

const MessageModal = props => {
  return (
    <div className="main-popup-component1">
      <p id="para">{props.message} </p>
      <div className="btn-classes1">
        <button onClick={props.closeModal}> Close </button>
      </div>
    </div>
  );
};

export default MessageModal;
