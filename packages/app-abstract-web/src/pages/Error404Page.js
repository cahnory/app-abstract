import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Error404Page = ({ staticContext }) => {
  if (staticContext) {
    staticContext.status = 404;
  }

  return (
    <div>
      <h1>404 Not Found</h1>
      <p>
        <Link to="/">Back to home</Link>
      </p>
    </div>
  );
};

Error404Page.propTypes = {
  staticContext: PropTypes.object,
};

Error404Page.defaultProps = {
  staticContext: null,
};

export default Error404Page;
