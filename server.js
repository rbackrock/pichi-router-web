const proxy = require('http-proxy-middleware');
const express = require('express');
const connectHistoryApiFallback = require('connect-history-api-fallback');

exports.run = () => {
  const app = express();
  const proxyOption = proxy({
    target: 'http://[::1]:8000',
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

  app.listen(3000);
  console.log('pichi ui is running...');
  require('opn')('http://localhost:3000/');
};
