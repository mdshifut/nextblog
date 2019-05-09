import React from "react";
import classnames from "classnames";
import { colorDeepBlack } from "../../utils/cssVariables";

const styledButton = props => {
  return (
    <span
      className={classnames("descriptionEditor__styledBtn", {
        "descriptionEditor__styledBtn--active": props.active
      })}
      onMouseDown={props.onToggle.bind(null, props.style)}
    >
      {props.label}

      <style jsx>{`
        span {
          display: inline-block;
          padding: 0 10px;
          cursor: pointer;
          ${props.active && ` color: ${colorDeepBlack}`}
        }
      `}</style>
    </span>
  );
};

export default styledButton;
