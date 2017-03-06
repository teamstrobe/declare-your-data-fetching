import React from 'react';

export default ({ error, onRetryClick }) => {
  switch (error && error.status) {
    case 404:
      return <div>Not found.</div>;
    default:
      return (
        <div>
          Oops, something went wrong.{' '}
          {onRetryClick &&
	          <a
	            href="#"
	            onClick={e => {
	              e.preventDefault();
	              onRetryClick();
	            }}
	            >
	            Retry
	          </a>
          }
        </div>
      );
  }
};
