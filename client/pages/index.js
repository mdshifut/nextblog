import { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { SET_MESSAGE } from '../store/actions/actionTypes';
class Index extends Component {
  onClickHandler = () => {
    this.props.dispatch({
      type: SET_MESSAGE,
      payload: {
        message: 'some thing will be good we are in home page'
      }
    });
  };
  render() {
    return (
      <div>
   
        <Link href="/about">
          <a>about</a>
        </Link>
        Our Home page <button onClick={this.onClickHandler}>Set message</button>
        {this.props.meta.message}
      </div>
    );
  }
}
export default connect(state => state)(Index);
