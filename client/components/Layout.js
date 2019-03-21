import Header from './header';
import { Container } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { colorBlack } from '../utils/cssVariables';
import 'react-toastify/dist/ReactToastify.css';
import PageLoader from './PageLoader';

const Layout = props => {
  return (
    <React.Fragment>
      <Header />
      <Container className={`bodyContainer ${props.className}`}>
        <PageLoader />
        {props.children}
      </Container>
      <style jsx global>
        {`
          .bodyContainer {
            background-color: ${colorBlack};
            margin: 50px auto;
            position: relative;
            min-height: 200px;
          }
        `}
      </style>
      <ToastContainer
        className="toast-container"
        hideProgressBar
        position="bottom-right"
      />
    </React.Fragment>
  );
};

export default Layout;
