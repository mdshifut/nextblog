import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import Link from 'next/link';
import { connect } from 'react-redux';
import { userMenuTrigger } from '../../../store/actions/metaActions';
import SignInForm from '../../userForms/SignInForm';
import PasswordResetForm from '../../userForms/PasswordResetForm';
import { colorBlue, colorWhite, colorGray } from '../../../utils/cssVariables';
class PopOverForm extends Component {
  state = {
    signInIsClose: false
  };

  formChangeHandeler = () =>
    this.setState({ signInIsClose: !this.state.signInIsClose });

  render() {
    // If the user card is close and the reset form is active then close the reset form
    if (!this.props.userMenuIsOpen && this.state.signInIsClose) {
      setTimeout(() => {
        this.setState({
          signInIsClose: false
        });
      }, 305);
    }

    return (
      <div className="popOverForm">
        <div className="popOverForm__header text-center">
          <h1 className="popOverForm__header__h1">Hello</h1>
          {this.state.signInIsClose ? (
            <Fragment>Reset your password</Fragment>
          ) : (
            <Fragment>Sign in to your account</Fragment>
          )}
        </div>
        <div className="popOverForm__form-container">
          <Row className="popOverForm__row">
            <Col xs="6" className="popOverForm__col-6">
              <SignInForm
                isPopOverForm
                className="popOverForm__form"
                formChangeHandeler={this.formChangeHandeler}
                userMenuTrigger={this.props.userMenuTrigger}
              />
            </Col>

            <Col xs="6" className="popOverForm__col-6">
              <PasswordResetForm
                isPopOverForm
                formChangeHandeler={this.formChangeHandeler}
                userMenuTrigger={this.props.userMenuTrigger}
              />
            </Col>
          </Row>
        </div>
        <div className="popOverForm__link ">
          <Link href="/signup">
            <a onClick={this.props.userMenuTrigger}>
              Don't have an account? Sign Up
              <i className="fa fa-arrow-right" />
            </a>
          </Link>
        </div>

        <style jsx global>{`
          .popOverForm {
            width: 350px;
            padding: 60px 30px;
          }
          .popOverForm__header {
            font-size: 14px;
            margin-bottom: 35px;
          }
          .popOverForm__header__h1 {
            font-size: 65px;
            line-height: 1;
          }
          .popOverForm__form-container {
            width: 640px;
            position: relative;
            left: ${this.state.signInIsClose ? '-350px' : '0'};
            transition: 0.3s;
          }

          .popOverForm__row {
            margin-left: -30px;
            margin-right: -30px;
          }
          .popOverForm__col-6 {
            padding-left: 30px;
            padding-right: 30px;
          }
          .popOverForm__form {
            opacity: ${!this.state.signInIsClose ? 1 : 0};
            visibility: ${!this.state.signInIsClose ? 'visible' : 'hidden'};
            transition: 0.3s;
          }

          .popOverForm__link {
            text-align: center;
            margin-top: 25px;
          }
          .popOverForm__link a {
            transition: 0.3s;
          }

          .popOverForm__link a i {
            margin-left: 5px;
          }
          .popOverForm__link a,
          .popOverForm .signUpSignInFrom__input,
          .popOverForm .signUpSignInFrom__input::placeholder,
          .popOverForm .signUpSignInFrom__link,
          .popOverForm .signUpSignInFrom__icon,
          .popOverForm .signUpSignInFrom__btn {
            color: ${colorWhite};
            transition: 0.3s;
          }
          .popOverForm .signUpSignInFrom__input.is-invalid,
          .popOverForm .signUpSignInFrom__input.is-invalid:focus {
            border-color: red;
            box-shadow: none;
          }
          .popOverForm .signUpSignInFrom__icon.isInvalid,
          .popOverForm .signUpSignInFrom__icon.isInvalid.isFocused {
            color: red;
          }
          .popOverForm .signUpSignInFrom__input {
            background: ${colorBlue};
            border-color: #fff;
          }
          .popOverForm .signUpSignInFrom__form-feedback {
            text-align: left;
            margin-top: 7px;
          }
          .popOverForm .signUpSignInFrom__btn {
            background: transparent;
            border: 1px solid #fff;
          }
          .popOverForm .signUpSignInFrom__input:focus,
          .popOverForm .signUpSignInFrom__input:focus::placeholder {
            color: ${colorGray};
            border-color: ${colorGray};
          }
          .popOverForm .signUpSignInFrom__icon.isFocused {
            color: ${colorGray};
          }

          .popOverForm .signUpSignInFrom__btn:hover {
            color: ${colorBlue};
            background: ${colorWhite};
          }
          .popOverForm .signUpSignInFrom__btn:disabled,
          .popOverForm .signUpSignInFrom__btn[disabled] {
            color: ${colorGray};
            border-color: ${colorGray};
            background: transparent;
          }
          .popOverForm__link a:hover,
          .signUpSignInFrom__link:hover {
            text-decoration: none;
            color: ${colorGray};
          }
        `}</style>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userMenuIsOpen: state.meta.userMenuIsOpen
});
export default connect(
  mapStateToProps,
  { userMenuTrigger }
)(PopOverForm);
