import { Component, Fragment } from 'react';
import Link from 'next/link';

import Layout from '../components/Layout';

class Index extends Component {
  render() {
    return (
      <Layout>
        <Link href="/about">
          <a>about</a>
        </Link>
      </Layout>
    );
  }
}
export default Index;
