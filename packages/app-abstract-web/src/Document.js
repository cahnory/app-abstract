import React from 'react';

const Document = ({ body, scriptElements, linkElements, styleElements }) => (
  <html>
    <head>
      <title>Hello world</title>
      <meta charSet="utf-8" />
      {linkElements}
      {styleElements}
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: body }} />
      {scriptElements}
    </body>
  </html>
);

export default Document;
