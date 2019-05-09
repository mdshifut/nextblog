import React, { Component } from "react";

// import Editor from "draft-js-plugins-editor";

import { connect } from "react-redux";

import createImagePlugin from "draft-js-image-plugin";
import "draft-js-image-plugin/lib/plugin.css";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { stateToHTML } from "draft-js-export-html";

import BlockStyleControls from "./BlockStyleControls";
import InlineStyleControls from "./InlineStyleControls";
import { addPostContent } from "../../store/actions/postActions";

import {
  colorWhite,
  colorGrayDeep,
  colorBlack
} from "../../utils/cssVariables";

const imagePlugin = createImagePlugin();
const getBlockStyle = block => {
  switch (block.getType) {
    case "blockqute":
      return "RichEditor-blockquote";

    default:
      return null;
  }
};

class DescriptionEditor extends Component {
  constructor(props) {
    super(props);

    this.focus = () => this.refs.editor.focus();
  }

  state = {
    editorState: EditorState.createEmpty(),
    editor: false
  };

  //   Handle change handler
  onChangeHandler = editorState => {
    this.setState({ editorState }, () => {
      const contentState = this.state.editorState.getCurrentContent();
      const content = convertToRaw(contentState);

      const contentHtml = stateToHTML(contentState);

      this.props.addPostContent({
        content,
        contentHtml
      });
    });
  };

  //   Handle key command
  handleKeyCommand = command => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChangeHandler(newState);
      return true;
    }
    return false;
  };

  //   Block style handler
  toggleBlockType = blockType => {
    this.onChangeHandler(
      RichUtils.toggleBlockType(this.state.editorState, blockType)
    );
  };

  //   Inline style handler
  toggleInlineStyle = inlineStyle => {
    this.onChangeHandler(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  };

  componentDidMount() {
    this.setState({ editor: true });
  }
  render() {
    const { editorState } = this.state;

    // If user changes block type before entering any text then styled the placeholder
    let className = "descriptionEditor__editor";
    let contentState = editorState.getCurrentContent();

    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== "unstyled"
      ) {
        className += " descriptionEditor__editor--hidePlaceholder";
      }
    }
    return (
      <div className="descriptionEditor descriptionEditor--root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />

        <InlineStyleControls
          onToggle={this.toggleInlineStyle}
          editorState={editorState}
        />

        <div className={className} onClick={this.focus}>
          {this.state.editor && (
            <Editor
              blockStyleFn={getBlockStyle}
              editorState={editorState}
              placeholder="Post description"
              onChange={this.onChangeHandler}
              handleKeyCommand={this.handleKeyCommand}
              spellCheck={true}
              ref="editor"
              // plugins={[imagePlugin]}
            />
          )}
        </div>

        <style jsx global>{`
          .descriptionEditor__editor--hidePlaceholder
            .public-DraftEditorPlaceholder-root {
            display: none;
          }
          .descriptionEditor h1,
          .descriptionEditor h2,
          .descriptionEditor h3,
          .descriptionEditor h4,
          .descriptionEditor h5,
          .descriptionEditor h6 {
            color: ${colorBlack};
          }
        `}</style>
        <style jsx>{`
          .descriptionEditor {
            background-color: ${colorWhite};
            color: ${colorGrayDeep};
            border-radius: 5px;
          }
          .descriptionEditor__editor--hidePlaceholder
            .public-DraftEditorPlaceholder-root {
            display: none;
          }
          .descriptionEditor__editor {
            min-height: 300px;
            padding: 10px;
            cursor: text;
          }
        `}</style>
      </div>
    );
  }
}

export default connect(
  null,
  { addPostContent }
)(DescriptionEditor);
