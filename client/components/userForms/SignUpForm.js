import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { Row, Col } from 'reactstrap';
import InputGroup from '../InputGroup';
import InlineLoading from '../InlineLoading';
import { signUp } from '../../store/actions/authActions';

import { signUpSignInFromCss } from '../../utils/styleJsx';

class SignUpForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
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
        if (
          !(
            this.state.firstName &&
            this.state.lastName &&
            this.state.userName &&
            this.state.email &&
            this.state.password &&
            this.state.confirmPassword
          )
        ) {
          isDisabled = true;
        }

        this.setState({ isDisabled });
      }
    );
  };

  submitHandeler = async event => {
    event.preventDefault();

    this.setState({
      isLoading: true,
      isDisabled: true
    });

    const {
      firstName,
      lastName,
      email,
      userName,
      password,
      confirmPassword
    } = this.state;

    const result = await this.props.signUp({
      user: {
        firstName,
        lastName,
        email,
        userName,
        password,
        confirmPassword
      },
      router: this.props.router
    });

    if (result.isSignUpDone)
      return this.setState({
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: '',
        confirmPassword: '',
        isLoading: false
      });

    return this.setState({
      isLoading: false
    });
  };

  render() {
    return (
      <form
        className="signUpSignInFrom clearfix"
        onSubmit={this.submitHandeler}
      >
        <Row>
          <Col sm="6">
            <InputGroup
              name="firstName"
              className="signUpSignInFrom"
              placeholder="First Name"
              icon="fa fa-user"
              onChange={this.changeHandeler}
              value={this.state.firstName}
              isInvalid={!!this.props.error.signUp.firstName}
              fromFeddback={this.props.error.signUp.firstName}
            />
          </Col>
          <Col sm="6">
            <InputGroup
              name="lastName"
              className="signUpSignInFrom"
              placeholder="Last Name"
              icon="fa fa-user-o"
              onChange={this.changeHandeler}
              value={this.state.lastName}
              isInvalid={!!this.props.error.signUp.lastName}
              fromFeddback={this.props.error.signUp.lastName}
            />
          </Col>
        </Row>
        <InputGroup
          name="email"
          className="signUpSignInFrom"
          placeholder="Email"
          type="email"
          icon="fa fa-envelope"
          onChange={this.changeHandeler}
          value={this.state.email}
          isInvalid={!!this.props.error.signUp.email}
          fromFeddback={this.props.error.signUp.email}
        />
        <InputGroup
          name="userName"
          className="signUpSignInFrom"
          placeholder="Username"
          type="text"
          icon="fa fa-user"
          onChange={this.changeHandeler}
          value={this.state.userName}
          isInvalid={!!this.props.error.signUp.userName}
          fromFeddback={this.props.error.signUp.userName}
        />
        <InputGroup
          name="password"
          className="signUpSignInFrom"
          type="password"
          placeholder="Password"
          icon="fa fa-lock"
          onChange={this.changeHandeler}
          value={this.state.password}
          isInvalid={!!this.props.error.signUp.password}
          fromFeddback={this.props.error.signUp.password}
        />
        <InputGroup
          name="confirmPassword"
          className="signUpSignInFrom"
          type="password"
          placeholder="Confirm password"
          icon="fa fa-unlock"
          onChange={this.changeHandeler}
          value={this.state.confirmPassword}
          isInvalid={!!this.props.error.signUp.confirmPassword}
          fromFeddback={this.props.error.signUp.confirmPassword}
        />
        <button
          className="float-right signUpSignInFrom__btn"
          type="submit"
          disabled={this.state.isDisabled}
        >
          {this.state.isLoading ? (
            <React.Fragment>
              Loading <InlineLoading InlineLoading={this.state.isLoading} />
            </React.Fragment>
          ) : (
            ' Sign Up'
          )}
        </button>
        <style jsx global>
          {signUpSignInFromCss}
        </style>
      </form>
    );
  }
}

const mapStateToProps = state => ({ error: state.error });

export default connect(
  mapStateToProps,
  { signUp }
)(withRouter(SignUpForm));
