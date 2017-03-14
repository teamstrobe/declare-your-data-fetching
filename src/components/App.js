import React, { Component } from 'react';
import { scrollToTop } from '../utilities/scrollToTop';

import Fetch from './Fetch';
import Error from './Error';
import Loading from './Loading';
import Product from './Product';
import Pagination from './Pagination';

import { getCheapAppleProducts } from '../services';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }
  render() {
    const { page } = this.state;
    return (
      <div style={{ maxWidth: 600, margin: 'auto' }}>
        <Fetch {...getCheapAppleProducts(page)}>
          {({loading, result, error}, retry) =>
            <div>
              {
                (loading && <Loading />) ||
                (error && <Error error={error} onRetryClick={retry} />) ||
                (result && result.products && <div>
                  {result.products.map((product, i) =>
                    <Product key={i} {...product} />
                  )}
                </div>)
              }
              {result && <Pagination
                  currentPage={page}
                  totalPages={result.totalPages}
                  onPaginationChange={page => {
                    this.setState({ page });
                    scrollToTop();
                  }}
                />
              }
            </div>
          }
        </Fetch>
      </div>
    );
  }
}

export default App;
