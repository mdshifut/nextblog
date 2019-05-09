import { Row, Col } from "reactstrap";
import { Fragment } from "react";
import { connect } from "react-redux";
import NavLink from "./NavLink";
import SocialLink from "./SocialLink";
const HeaderBottom = props => {
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
              {/* <li>
                {props.auth.isAuthenticated
                  ? props.auth.user.userName
                  : "No user found"}
              </li> */}
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
            margin: 0;
            padding: 0;
            list-style: none;
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(HeaderBottom);
