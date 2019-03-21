import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Link from 'next/link';
import { withRouter } from 'next/router';
import InlineLoading from '../components/InlineLoading';
import { sendNewActivationLink } from '../store/actions/authActions';
import Layout from '../components/Layout';
import { confirmationCss } from '../utils/styleJsx';
const { className, styles } = confirmationCss;

const ActiveAccount = ({
  data,
  inlineLoading,
  user,
  router,
  sendNewActivationLink
}) => {
  return (
    <Layout className={`text-center activeAccount ${className}`}>
      {data.message && <h1>Welcome</h1>}

      {data.message ? (
        <i className={`fa fa-check-circle ${className}`} />
      ) : (
        <i className={`fa fa-exclamation-circle ${className}`} />
      )}

      {data.message ? (
        <Fragment>
          <p> {data.message} </p>
          <Link href="/signin">
            <a>Sign In</a>
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <p> {data.error.message} </p>
          <a
            className={className}
            href="/"
            onClick={event => {
              event.preventDefault();
              sendNewActivationLink(user, router);
            }}
          >
            Resend activation link{' '}
            {<InlineLoading inlineLoading={inlineLoading} />}
          </a>
        </Fragment>
      )}

      {styles}
    </Layout>
  );
};

ActiveAccount.getInitialProps = async ({ query, req }) => {
  const { token, user } = query;
  let url =
    req && req.headers && req.headers.host
      ? 'http://' + req.headers.host
      : window.location.origin;

  const { data } = await axios.get(`${url}/api/user/activeaccount/${token}`);

  return {
    data,
    user
  };
};

const mapStateToProps = state => ({
  inlineLoading: state.meta.inlineLoading
});

export default connect(
  mapStateToProps,
  { sendNewActivationLink }
)(withRouter(ActiveAccount));
