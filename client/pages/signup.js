import { Component } from 'react';
import Link from 'next/link';

import { Row, Col } from 'reactstrap';
import Layout from '../components/Layout';
import SignUpForm from '../components/userForms/SignUpForm';
import { formPageCss } from '../utils/styleJsx';
class SignUp extends Component {
  render() {
    return (
      <Layout>
        <div className="registerLogin__left">
          <h1 className="registerLogin__left-heading">
            Register for <br /> the best experience.
          </h1>

          <Link href="/signin">
            <a className="registerLogin__link">I'M ALREADY MEMBER</a>
          </Link>
        </div>
        <Row>
          <Col sm={{ size: 6, offset: 6 }}>
            <div className="registerLogin__right">
              <h2 className="registerLogin__left-heading">Sign Up</h2>

              <SignUpForm />
            </div>
          </Col>
        </Row>
        <style jsx>{formPageCss}</style>
      </Layout>
    );
  }
}

export default SignUp;
