import { PropTypes, PureComponent } from 'react';
import lscache from 'lscache';

import { protectFromUnmount } from '../utilities/protectFromUnmount';

window.lscache = lscache;

export default class Fetch extends PureComponent { // @TODO - should I be using PureComponent
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      error: null,
      loading: false,
    };
    this.protect = protectFromUnmount();
  }

  componentWillUnmount() {
    this.protect.unmount();
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { shouldFetchAgain } = nextProps;
    if (shouldFetchAgain(this.props, nextProps)) {
      this.fetchData(nextProps);
    }
  }

  fetchData(props) {
    const { shouldFetch, path, method, headers, cache, cacheLength } = props;

    if (!shouldFetch(props)) {
      return;
    }

    if (cache) {
      const fromCache = lscache.get(path);
      if (fromCache) {
        this.setState({
          result: fromCache,
          error: null,
          loading: false,
        });
        return;
      }
    }

    this.setState({
      error: null,
      loading: true,
    }, () => {
      fetch(path, {
        method,
        headers,
      })
        .then(response => response.json())
        .then(result => {
          if (cache) {
            lscache.set(path, result, cacheLength);
          }
          return result;
        })
        .then(this.protect(result => {
          throw new Error('oops');
          setTimeout(() => {
            this.setState({
              result,
              error: null,
              loading: false,
            });
          }, 1000);
        }))
        .catch(this.protect(error => {
          this.setState({
            result: null,
            error,
            loading: false,
          });
        }));
    });
  }

  render() {
    const retry = () => this.fetchData(this.props);
    return this.props.children(this.state, retry);
  }
}

Fetch.propTypes = {
  children: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export const shouldFetchAgain = (props, nextProps) => (
  props.path !== nextProps.path
  // @TODO - use a shallow compare?
);

Fetch.defaultProps = {
  shouldFetch: () => true,
  shouldFetchAgain,
	method: 'GET',
  cache: false,
  cacheLength: 720, // 12 hours
  headers: {
    Accept: 'application/json',
  },
};
