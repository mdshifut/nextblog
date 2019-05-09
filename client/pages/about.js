import { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { setMessage } from '../store/actions/metaActons';

class Index extends Component {
  onClickHandler = () => {
    this.props.setMessage('We are doing some thing new');
  };
  render() {
    return (
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        Our about page
        <button onClick={this.onClickHandler}>Set message</button>
        {this.props.meta.message}
      </div>
    );
  }
}
export default connect(
  state => state,
  { setMessage }
)(Index);
