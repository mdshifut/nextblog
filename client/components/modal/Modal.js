import React, { Component } from "react";
import { connect } from "react-redux";
import { modalTrigger } from "../../store/actions/metaActions";

class Modal extends Component {
  render() {
    return (
      <div className="modal-wrapper">
        <div className="overlay" onClick={this.props.modalTrigger} />
        <div className="modal-container">{this.props.children}</div>
        <style jsx>{`
          .modal-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            transition: 0.3s;
            opacity: 0;
            visibility: hidden;
            ${this.props.isOpen
              ? "z-index:555555;opacity:1;visibility:visible "
              : ""}
          }
          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            background: #000;
            opacity: 0;
            width: 100%;
            height: 100%;
            transition: 0.3s;
            ${this.props.isOpen && "opacity:0.8;"}
          }
          .modal-container {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            z-index: 999999999;
          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = state => ({ isOpen: state.meta.modalIsOpen });

export default connect(
  mapStateToProps,
  { modalTrigger }
)(Modal);
