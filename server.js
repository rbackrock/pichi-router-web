const proxy = require('http-proxy-middleware');
const express = require('express');
const connectHistoryApiFallback = require('connect-history-api-fallback');

exports.run = (port) => {
  const app = express();
  const proxyOption = proxy({
    target: `http://[::1]:${port}`,
    pathRewrite: {
      '^/api': ''
    },
    secure: true,
    logLevel: 'error',
    headers: {
      "Connection": "keep-alive"
    },
  });

  app.use(connectHistoryApiFallback());
  app.use('/', express.static('build'));
  app.use('/api', proxyOption);

  const server = app.listen(0, () => {
    console.log('Congratulations!');
    console.log(`Please visit: http://localhost:${server.address().port} or http://[::1]:${server.address().port}`);
    require('opn')(`http://localhost:${server.address().port}/`);
  });
};
