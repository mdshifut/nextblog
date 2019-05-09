import { colorBlue, colorWhite } from '../../../utils/cssVariables';
import { connect } from 'react-redux';
import PopOverNav from './PopOverNav';
import PopOverForm from './PopOverForm';
const PopOverBox = props => {
  const { userMenuIsOpen, isAuthenticated } = props;
  return (
    <aside>
      <div>{isAuthenticated ? <PopOverNav /> : <PopOverForm />}</div>

      <style jsx>{`
        aside {
          color: ${colorWhite};
          position: absolute;
          right: 0;
          top: 56px;
          background: ${colorBlue};
          min-width: 200px;
          min-height: 200px;
          z-index: 9999;
          transition: 0.3s;
          ${userMenuIsOpen
            ? `
            opacity: 1;
            visibility: visible;
            box-shadow: 2px 0 20px #38373D;
            z-index: 9999999999;`
            : `
            opacity: 0;
            visibility: hidden;
            box-shadow: none;
            z-index: -1;`}
        }

        aside:before {
          content: '';
          position: absolute;
          right: 15px;
          top: -8px;
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;

          border-bottom: 8px solid ${colorBlue};
          z-index: 777;
        }

        div {
          overflow: hidden;
        }
      `}</style>
    </aside>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userMenuIsOpen: state.meta.userMenuIsOpen
});
export default connect(mapStateToProps)(PopOverBox);
