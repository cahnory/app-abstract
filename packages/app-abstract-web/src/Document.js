import React from 'react';
import PropTypes from 'prop-types';

const Document = ({
  body,
  lang,
  scriptElements,
  linkElements,
  styleElements,
}) => (
  <html lang={lang}>
    <head>
      <title>Hello world</title>
      <meta charSet="utf-8" />
      {linkElements}
      {styleElements}
    </head>
    <body>
      {/* eslint-disable-next-line react/no-danger */}
      <div id="root" dangerouslySetInnerHTML={{ __html: body }} />
      {scriptElements}
    </body>
  </html>
);

Document.propTypes = {
  body: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  scriptElements: PropTypes.node.isRequired,
  linkElements: PropTypes.node.isRequired,
  styleElements: PropTypes.node.isRequired,
};

export default Document;
