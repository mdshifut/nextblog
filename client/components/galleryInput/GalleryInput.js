import React, { Component } from "react";
import { connect } from "react-redux";
import { modalTrigger } from "../../store/actions/metaActions";
import GalleryInputModal from "./GalleryInputModal";
import { colorBlack, colorWhite } from "../../utils/cssVariables";
class GalleryInput extends Component {
  state = {};

  render() {
    return (
      <div className="gallery-input-container">
        <GalleryInputModal />
        <ul>
          <li className="text-center">
            <button
              type="button"
              onClick={this.props.modalTrigger}
              className="gallery-add-btn"
            >
              <i
                className="fa fa-picture-o gallery-add-btn__icon"
                aria-hidden="true"
              />
              Add gallery content
            </button>
          </li>
        </ul>

        <style jsx>{`
          .gallery-input-container {
            margin-bottom: 10px;
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          li {
            display: inline-block;
            height: 120px;
            width: 150px;
            border-radius: 5px;
            overflow: hidden;
          }
          .gallery-add-btn {
            height: 100%;
            width: 100%;
            background: ${colorWhite};
            border: none;
            color: ${colorBlack};
            padding: 10px;
          }
          .gallery-add-btn__icon {
            display: block;
            font-size: 40px;
            color: #ddd;
          }
        `}</style>
      </div>
    );
  }
}
const mapStateToProps = state => ({ modalIsOpen: state.meta.modalIsOpen });
export default connect(
  mapStateToProps,
  { modalTrigger }
)(GalleryInput);
