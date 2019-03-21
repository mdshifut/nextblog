import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createNewPassword } from '../../store/actions/authActions';
import InlineLoading from '../InlineLoading';
import InputGroup from '../InputGroup';

import './userForms.style.scss';

class CreateNewPassword extends Component {
  state = {
    password: '',
    confirmPassword: '',
    isDisabled: true,
    isLoading: false
  };

  changeHandeler = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        let isDisabled = false;
        if (!(this.state.password && this.state.confirmPassword)) {
          isDisabled = true;
        }

        this.setState({ isDisabled });
      }
    );
  };

  submitHandeler = async event => {
    event.preventDefault();
    this.setState({
      isDisabled: true,
      isLoading: true
    });
    const { password, confirmPassword } = this.state;
    const { token } = this.props.match.params;

    const result = await this.props.createNewPassword({
      newPassword: { password, confirmPassword },
      token
    });

    if (result.isCreateNewPasswordDone) {
      return this.setState({
        isLoading: false,
        password: '',
        confirmPassword: ''
      });
    }

    return this.setState({
      isLoading: false
    });
  };

  render() {
    return (
      <form
        className={`signUpSignInFrom clearfix ${this.props.className}`}
        onSubmit={this.submitHandeler}
      >
        <InputGroup
          name="password"
          inputId="resetPass"
          className="signUpSignInFrom"
          placeholder="Enter your new password"
          type="password"
          icon="fas fa-lock"
          onChange={this.changeHandeler}
          value={this.state.password}
          isInvalid={!!this.props.error.createNewPassword.password}
          fromFeddback={this.props.error.createNewPassword.password}
        />
        <InputGroup
          name="confirmPassword"
          inputId="resetConfirmPass"
          className="signUpSignInFrom"
          placeholder="Confirm your password"
          type="password"
          icon="fas fa-lock"
          onChange={this.changeHandeler}
          value={this.state.confirmPassword}
          isInvalid={!!this.props.error.createNewPassword.confirmPassword}
          fromFeddback={this.props.error.createNewPassword.confirmPassword}
        />
        <div className="clearfix">
          <Link to="/signin" className="float-right signUpSignInFrom__link">
            Back to Sign In
          </Link>
        </div>
        <button
          className="float-right signUpSignInFrom__btn"
          type="submit"
          disabled={this.state.isDisabled}
        >
          {this.state.isLoading ? (
            <React.Fragment>
              Loading <InlineLoading inlineLoading={this.state.isLoading} />
            </React.Fragment>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error
});

export default connect(
  mapStateToProps,
  { createNewPassword }
)(withRouter(CreateNewPassword));
