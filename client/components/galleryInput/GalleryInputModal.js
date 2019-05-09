import React, { Component } from "react";
import Modal from "../modal/Modal";

import { colorWhite, colorBlue } from "../../utils/cssVariables";
export default class GalleryInputModal extends Component {
  render() {
    return (
      <Modal>
        <div className="gallery-input-modal">
          <h4 className="gallery-input-modal__title text-center">
            Add gallery content
          </h4>
          <div className="gallery-input-modal__body clearfix">
            <div className="gallery-input-type">
              <button className="gallery-input-type__btn">
                <i className="fa fa-youtube" />
              </button>
              <button className="gallery-input-type__btn">
                <i className="fa fa-soundcloud" />
              </button>

              <button className="gallery-input-type__btn">
                <i className="fa fa-upload" />
              </button>
            </div>
            <div className="gallery-input" />
          </div>
        </div>

        <style jsx>{`
          .gallery-input-modal {
            background: ${colorWhite};
            border-radius: 5px;
            overflow: hidden;
            width: 500px;
          }
          .gallery-input-modal__title {
            color: ${colorWhite};
            background: ${colorBlue};
            padding: 10px;
            margin-bottom: 0;
          }
          .gallery-input-type {
            float: left;
            width: 100px;
          }
          .gallery-input-type__btn {
            display: block;
            font-size: 30px;
            background: ${colorBlue};
            color: ${colorWhite};
            border: none;
            width: 80px;
            text-align: center;
            outline: 0;
            border-top: 1px solid ${colorWhite};
          }
        `}</style>
      </Modal>
    );
  }
}
