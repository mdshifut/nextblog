import { Row, Col } from 'reactstrap';
import { Fragment } from 'react';
import NavLink from './NavLink';
import SocialLink from './SocialLink';
const HeaderBottom = () => {
  return (
    <Fragment>
      <Row>
        <Col sm="8">
          <nav className="nav__ul">
            <ul>
              <NavLink href="/" title="Home" />
              <NavLink href="/" title="Scince" />
              <NavLink href="/" title="Technolgy" />
              <NavLink href="/" title="Contact Us" />
            </ul>
          </nav>
        </Col>
        <Col sm="4">
          <nav>
            <ul className="social__ul">
              <SocialLink href="facebook.com">
                <i className="fa fa-facebook" />
              </SocialLink>
              <SocialLink href="twitter.com">
                <i className="fa fa-twitter" />
              </SocialLink>
              <SocialLink href="instagram.com">
                <i className="fa fa-instagram" />
              </SocialLink>
              <SocialLink href="facebook.com">
                <i className="fa fa-facebook" />
              </SocialLink>
            </ul>
          </nav>
        </Col>
      </Row>
      <style jsx>
        {`
          ul {
            padding-top: 10px;
          }
          .social__ul {
            text-align: right;
            margin-right: -5px;
          }
          .nav__ul {
            margin-left: -5px;
          }
        `}
      </style>
    </Fragment>
  );
};

export default HeaderBottom;
