import React from 'react';

const Document = ({ scripts, body }) => (
  <html>
    <head>
      <title>Hello world</title>
      <meta charSet="utf-8" />
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: body }} />
      {scripts.map((src) => (
        <script src={src} />
      ))}
    </body>
  </html>
);

Document.defaultProps = {
  scripts: [],
};

export default Document;
