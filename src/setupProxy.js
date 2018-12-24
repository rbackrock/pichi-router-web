const proxy = require('http-proxy-middleware');
const fs = require('fs');

const proxyConfigPath = `${process.cwd()}/config/proxy-config.json`;
let proxyConfig = {};

try {
  proxyConfig = JSON.parse(fs.readFileSync(proxyConfigPath).toString());
}catch (e) {
  console.log(e);
}

module.exports = function(app) {
  const proxyOption = proxy({
    target: `http://[::1]:${proxyConfig.port}`,
    pathRewrite: {
      '^/api': ''
    },
    secure: true,
    logLevel: 'error',
    headers: {
      "Connection": "keep-alive"
    },
  });

  app.use('/api', proxyOption);
};
