import { colorDeepBlack } from '../utils/cssVariables';
import { connect } from 'react-redux';
const PageLoader = ({ isLoading }) => {
  return (
    <div className="text-center">
      <img src="/static/spiner.svg" alt="loader" />
      <style jsx>{`
        div {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: ${isLoading ? 0 : '0.3s'};
          background-color: ${colorDeepBlack};
          opacity: ${isLoading ? 1 : 0};
          z-index: ${isLoading ? 999 : -1};
        }
        img {
          height: 200px;
          width: 200px;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = state => ({ isLoading: state.meta.isLoading });
export default connect(mapStateToProps)(PageLoader);
