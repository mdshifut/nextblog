import React from "react";
import StyledButton from "./StyledButton";
import { colorBlue, colorWhite } from "../../utils/cssVariables";

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Code", style: "CODE" }
];

const InlineStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="descriptionEditor__controls">
      {INLINE_STYLES.map(type => (
        <StyledButton
          key={type.label}
          active={currentStyle.has(type.style)}
          {...type}
          onToggle={props.onToggle}
        />
      ))}
      <style jsx>{`
        .descriptionEditor__controls {
          background: ${colorBlue};
          padding: 10px;
          color: ${colorWhite};
        }
      `}</style>
    </div>
  );
};

export default InlineStyleControls;
