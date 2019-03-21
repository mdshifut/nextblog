import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import makeStore from '../store/index';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { toast } from 'react-toastify';

import {
  colorDeepBlack,
  colorGrayDeep,
  colorWhite
} from '../utils/cssVariables';

import 'bootstrap/dist/css/bootstrap.css';

// Check user is login or not
// const token = localStorage.getItem('auth_token');
// if (token) {
//   const decode = jwtDecode(token);
//   if (decode.exp * 1000 > new Date().getTime()) {
//     store.dispatch(setUser(decode));
//     setAuthToken(token);
//   } else {
//     toast.warn('Login Expired. Please Sign In again...');
//   }
// }

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Domine:400,700|Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          />
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>

        <style jsx global>{`
          body {
            background-color: ${colorDeepBlack};
            color: ${colorGrayDeep};

            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            line-height: 1.6;
            font-size: 16px;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-family: 'Domine', serif;
            font-weight: 700;
            line-height: 1;
            color: ${colorWhite};
          }

          a {
            text-decoration: none;
            font-family: 'Domine', serif;
          }
        `}</style>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);
