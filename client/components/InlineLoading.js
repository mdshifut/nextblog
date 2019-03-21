import React from 'react';
import { BeatLoader } from 'react-spinners';

const inlineLoading = props => {
  return (
    <div className="d-inline-block">
      <BeatLoader
        className="nothing"
        size={props.size ? props.size : 10}
        margin={props.margin ? props.margin : '0 1px'}
        color={props.color ? props.color : '#6CA4DB'}
        loading={props.inlineLoading}
      />
    </div>
  );
};

export default inlineLoading;
