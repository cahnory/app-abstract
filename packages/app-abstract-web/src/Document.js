import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Document = ({ body, scriptElements, linkElements, styleElements }) => {
  const helmet = Helmet.renderStatic();
  const {
    lang = 'en',
    ...htmlAttributes
  } = helmet.htmlAttributes.toComponent();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <html lang={lang} {...htmlAttributes}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {linkElements}
        {styleElements}
      </head>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <body {...helmet.bodyAttributes.toComponent()}>
        {/* eslint-disable-next-line react/no-danger */}
        <div id="root" dangerouslySetInnerHTML={{ __html: body }} />
        {scriptElements}
      </body>
    </html>
  );
};

Document.propTypes = {
  body: PropTypes.string.isRequired,
  scriptElements: PropTypes.node.isRequired,
  linkElements: PropTypes.node.isRequired,
  styleElements: PropTypes.node.isRequired,
};

export default Document;
