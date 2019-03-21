import { Component } from 'react';
import classNames from 'classnames';

import { FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import PropTypes from 'prop-types';

class InputGroup extends Component {
  state = {
    focus: false
  };

  focusHandeler = () => {
    this.setState({ focus: true });
  };

  blurHandeler = () => {
    this.setState({ focus: false });
  };

  render() {
    const {
      name,
      value,
      label,
      fromFeddback,
      formText,
      type,
      isInvalid,
      isValid,
      className,
      onChange,
      placeholder,
      icon,
      inputId
    } = this.props;

    return (
      <FormGroup className={`${className}__form-group`}>
        {label && (
          <Label
            className={`${className}__label`}
            for={inputId ? inputId : name}
          >
            {label}
          </Label>
        )}
        {icon && (
          <i
            className={classNames(`${icon} ${className}__icon`, {
              isFocused: this.state.focus,
              isInvalid: isInvalid,
              isValid: isValid
            })}
          />
        )}
        <Input
          name={name}
          id={inputId ? inputId : name}
          type={type}
          invalid={isInvalid}
          valid={isValid}
          placeholder={placeholder}
          className={`${className}__input`}
          onChange={onChange && onChange}
          onFocus={this.focusHandeler}
          onBlur={this.blurHandeler}
          value={value}
        />
        {fromFeddback && (
          <FormFeedback
            invalid={isInvalid ? 'true' : undefined}
            valid={isValid ? true : undefined}
            tag="p"
            className={`${className}__form-feedback`}
          >
            {fromFeddback}
          </FormFeedback>
        )}
        {formText && (
          <FormText className={`${className}__form-text`}>{formText}</FormText>
        )}
      </FormGroup>
    );
  }
}

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  fromFeddback: PropTypes.string,
  formText: PropTypes.string,
  type: PropTypes.string.isRequired,
  isInvalid: PropTypes.bool,
  isValid: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  inputId: PropTypes.string
};

InputGroup.defaultProps = {
  type: 'text'
};
export default InputGroup;
