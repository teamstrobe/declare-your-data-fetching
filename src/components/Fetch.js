import { PropTypes, PureComponent } from 'react';
import lscache from 'lscache';

import { protectFromUnmount } from '../utilities/protectFromUnmount';
import { shallowCompare } from '../utilities/shallowCompare';

window.lscache = lscache;

export default class Fetch extends PureComponent {
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
    if (!shallowCompare(this.props, nextProps)) {
      this.fetchData(nextProps);
    }
  }

  fetchData(props) {
    const { path, method, headers, cache, cacheLength } = props;

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
  method: PropTypes.string.isRequired,
  cache: PropTypes.bool.isRequired,
};

Fetch.defaultProps = {
	method: 'GET',
  cache: false,
  cacheLength: 720, // 12 hours
  headers: {
    Accept: 'application/json',
  },
};
