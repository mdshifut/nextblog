import { Component } from 'react';
import Link from 'next/link';

import { Row, Col } from 'reactstrap';
import Layout from '../components/Layout';
import CreateNewPasswordForm from '../components/userForms/CreateNewPasswordForm';
import { formPageCss } from '../utils/styleJsx';
class SignUp extends Component {
  render() {
    return (
      <Layout>
        <div className="registerLogin__left">
          <h1 className="registerLogin__left-heading">
            Login for <br /> the best experience.
          </h1>

          <Link href="/signup">
            <a className="registerLogin__link">Don't have an account ?</a>
          </Link>
        </div>
        <Row>
          <Col sm={{ size: 6, offset: 6 }}>
            <div className="registerLogin__right">
              <h2 className="registerLogin__left-heading">
                Create new password
              </h2>

              <CreateNewPasswordForm />
            </div>
          </Col>
        </Row>
        <style jsx>{formPageCss}</style>
      </Layout>
    );
  }
}

export default SignUp;
