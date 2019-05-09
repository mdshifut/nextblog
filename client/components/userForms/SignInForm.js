import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { signIn } from '../../store/actions/authActions';
import InlineLoading from '../InlineLoading';
import InputGroup from '../InputGroup';
import { signUpSignInFromCss } from '../../utils/styleJsx';

class SignInForm extends Component {
  state = {
    userName: '',
    password: '',
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
        if (!(this.state.userName && this.state.password)) {
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

    const user = {
      userName: this.state.userName,
      password: this.state.password
    };

    const result = await this.props.signIn({
      user,
      router: this.props.router,
      userMenuTrigger: this.props.userMenuTrigger
    });

    if (result.isSignInDone)
      return this.setState({
        userName: '',
        password: '',
        isLoading: false
      });

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
          name="userName"
          inputId={
            this.props.isPopOverForm ? 'popOverFormName' : 'signInUserName'
          }
          className="signUpSignInFrom"
          placeholder="Enter your username or email"
          type="text"
          icon="fa fa-user"
          onChange={this.changeHandeler}
          value={this.state.userName}
          isInvalid={
            this.props.isPopOverForm
              ? !!this.props.error.signInNav.userName
              : !!this.props.error.signIn.userName
          }
          fromFeddback={
            this.props.isPopOverForm
              ? this.props.error.signInNav.userName
              : this.props.error.signIn.userName
          }
        />
        <InputGroup
          name="password"
          inputId={
            this.props.isPopOverForm ? 'popOverFormPassword' : 'signInPassword'
          }
          className="signUpSignInFrom"
          type="password"
          placeholder="Password"
          icon="fa fa-lock"
          onChange={this.changeHandeler}
          value={this.state.password}
          isInvalid={
            this.props.isPopOverForm
              ? !!this.props.error.signInNav.password
              : !!this.props.error.signIn.password
          }
          fromFeddback={
            this.props.isPopOverForm
              ? this.props.error.signInNav.password
              : this.props.error.signIn.password
          }
        />
        <div className="clearfix">
          {this.props.isPopOverForm ? (
            <span
              className="float-right signUpSignInFrom__link"
              onClick={this.props.formChangeHandeler}
            >
              Forgot your password <i className="fa fa-arrow-right" />
            </span>
          ) : (
            <Link href="/reset-password">
              <a className="float-right signUpSignInFrom__link">
                Forgot your password?
              </a>
            </Link>
          )}
        </div>
        <button
          className="float-right signUpSignInFrom__btn"
          type="submit"
          disabled={this.state.isDisabled}
        >
          {this.state.isLoading ? (
            <React.Fragment>
              Loading {<InlineLoading inlineLoading={this.state.isLoading} />}
            </React.Fragment>
          ) : (
            ' Sign In'
          )}
        </button>
        <style jsx global>
          {signUpSignInFromCss}
        </style>
      </form>
    );
  }
}

const mapStateToProps = store => ({
  isDisabled: store.meta.isDisabled,
  error: store.error
});

export default connect(
  mapStateToProps,
  { signIn }
)(withRouter(SignInForm));
