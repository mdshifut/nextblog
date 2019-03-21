import { Component, Fragment } from 'react';
import { colorWhite } from '../../../utils/cssVariables';
class UserCard extends Component {
  render() {
    return (
      <Fragment>
        <button>Sign In</button>

        <style jsx>
          {`
            button {
              border: none;
              background: none;
              color: ${colorWhite};
              padding: 0;
            }
          `}
        </style>
      </Fragment>
    );
  }
}

export default UserCard;
