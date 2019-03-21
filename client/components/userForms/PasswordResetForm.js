import { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { resetPassword } from '../../store/actions/authActions';
import InlineLoading from '../InlineLoading';
import InputGroup from '../InputGroup';
import { signUpSignInFromCss } from '../../utils/styleJsx';
class PasswordResetForm extends Component {
  state = {
    userInfo: '',
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
        if (!this.state.userInfo) {
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

    const { userInfo } = this.state;

    const result = await this.props.resetPassword({
      userInfo,
      userNavTriggerBtnClickHandeler: this.props.userNavTriggerBtnClickHandeler
    });

    if (result.isResetDone)
      return this.setState({
        userInfo: '',
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
          name="userInfo"
          inputId={this.props.isUserNav ? 'userCardUser' : 'resetUser'}
          className="signUpSignInFrom"
          placeholder="Enter your username or email"
          type="text"
          icon="fa fa-user"
          onChange={this.changeHandeler}
          value={this.state.userInfo}
          isInvalid={
            this.props.isUserNav
              ? !!this.props.error.passwordResetNav.userInfo
              : !!this.props.error.passwordReset.userInfo
          }
          fromFeddback={
            this.props.isUserNav
              ? this.props.error.passwordResetNav.userInfo
              : this.props.error.passwordReset.userInfo
          }
        />
        <div className="clearfix">
          {this.props.isUserNav ? (
            <span
              className="float-right signUpSignInFrom__link"
              onClick={this.props.formChangeHandeler}
            >
              <i className="fas fa-arrow-left" /> Back to Sign In
            </span>
          ) : (
            <Link href="/signin">
              <a className="float-right signUpSignInFrom__link">
                Back to Sign In
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
              Loading {<InlineLoading InlineLoading={this.state.isLoading} />}
            </React.Fragment>
          ) : (
            ' Reset Password'
          )}
        </button>
        <style jsx global>
          {signUpSignInFromCss}
        </style>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error
});

export default connect(
  mapStateToProps,
  { resetPassword }
)(PasswordResetForm);
