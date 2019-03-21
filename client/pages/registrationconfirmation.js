import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Layout from '../components/Layout';
import InlineLoading from '../components/InlineLoading';
import { sendNewActivationLink } from '../store/actions/authActions';
import { confirmationCss } from '../utils/styleJsx';
const { className, styles } = confirmationCss;

const RegistrationConfirmation = props => {
  return (
    <Layout className={`text-center activeAccount ${className}`}>
      <h1>Thanks for the registration!</h1>

      <i className={`fa fa-check-circle ${className}`} />

      <p>
        Your account has been create successfully and a activation email has
        been sent to your registered email address. Please open the email and
        click on the activation link to activate your account.
      </p>

      <a
        className={className}
        href="/"
        onClick={event => {
          event.preventDefault();
          props.sendNewActivationLink(props.router.query.id, props.router);
        }}
      >
        Resend activation link{' '}
        {<InlineLoading inlineLoading={props.inlineLoading} />}
      </a>
      {styles}
    </Layout>
  );
};
const mapStateToProps = state => ({
  inlineLoading: state.meta.inlineLoading
});
export default connect(
  mapStateToProps,
  { sendNewActivationLink }
)(withRouter(RegistrationConfirmation));
