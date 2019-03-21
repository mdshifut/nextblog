import { Row, Col } from 'reactstrap';
import Link from 'next/link';
import UserCard from './userCard';
import { colorWhite } from '../../utils/cssVariables';

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

            <li>
              <UserCard />
            </li>
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
          padding: 9.2px 0;
          text-align: right;
        }
        li {
          font-size: 20px;
          margin-left: 15px;
          cursor: pointer;
          transition: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default HeaderTop;
