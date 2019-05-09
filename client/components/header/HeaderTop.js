import { Row, Col } from "reactstrap";
import Link from "next/link";
import { colorWhite } from "../../utils/cssVariables";
import UserMenu from "./userMenu";

const HeaderTop = () => {
  return (
    <div className="header-top">
      <Row>
        <Col sm="6">
          <Link href="/">
            <a className="logo">TechBlog</a>
          </Link>
        </Col>
        <Col sm="6">
          <ul className="header-top__ul">
            <li>
              <i className="fa fa-search" />
            </li>
            <li>
              <i className="fa fa-bell" />
            </li>
            <UserMenu />
          </ul>
        </Col>
      </Row>

      <style jsx>{`
        .header-top {
          border-bottom: 1px solid ${colorWhite};
          padding-bottom: 10px;
        }
        .logo {
          font-size: 50px;
          font-weight: 700;
          line-height: 1;
        }
        .logo:hover {
          color: ${colorWhite};
          text-decoration: none;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style: none;

          text-align: right;
          line-height: 1;
        }
        li {
          font-size: 20px;
          margin-right: 15px;
          cursor: pointer;
          transition: 0.3s;
          padding: 15px 0;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default HeaderTop;
