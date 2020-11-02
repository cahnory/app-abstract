import React from 'react';
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

export default Error404Page;
