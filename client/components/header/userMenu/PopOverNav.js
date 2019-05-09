import React from "react";
import Link from "next/link";
import { connect } from "react-redux";

import { signOut } from "../../../store/actions/authActions";

const PopOverNav = props => {
  return (
    <div className="navMenu">
      <ul>
        <li>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </li>
        <li>
          <Link href="/newpost">
            <a> New Post</a>
          </Link>
        </li>
        <li>
          <a
            href="/"
            className="signIn"
            onClick={event => {
              event.preventDefault();
              props.userMenuTrigger();
              setTimeout(() => {
                props.signOut();
              }, 350);
            }}
          >
            Sign Out
          </a>
        </li>
      </ul>
      <style jsx>{`
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }
      `}</style>
    </div>
  );
};

export default connect(
  null,
  { signOut }
)(PopOverNav);
