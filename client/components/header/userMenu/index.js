import { Component, Fragment } from "react";

import { connect } from "react-redux";
import { colorWhite } from "../../../utils/cssVariables";
import { userMenuTrigger } from "../../../store/actions/metaActions";
import PopOverBox from "./PopOverBox";
import Avatar from "./Avatar";

class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.userMenu = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.outsideClickHandler);
  }

  outsideClickHandler = event => {
    if (
      !this.userMenu.current.contains(event.target) &&
      this.props.userMenuIsOpen
    ) {
      this.props.userMenuTrigger();
    }
  };

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.outsideClickHandler);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <li ref={this.userMenu}>
        <button type="button" onClick={this.props.userMenuTrigger}>
          {isAuthenticated ? <Avatar user={user} /> : "Sign In"}
        </button>

        <PopOverBox />

        <style jsx>
          {`
            li {
              position: relative;
              display: inline-block;
            }
            button {
              background: none;
              color: ${colorWhite};

              ${isAuthenticated
                ? ` width: 50px;height: 50px;border: 1px solid ${colorWhite}; border-radius:50%`
                : "padding:15px 0;border:none"}
            }
            button:focus {
              outline: none;
            }
          `}
        </style>
      </li>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  userMenuIsOpen: state.meta.userMenuIsOpen
});
export default connect(
  mapStateToProps,
  { userMenuTrigger }
)(UserMenu);
