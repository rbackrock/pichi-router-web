const { injectBabelPlugin } = require('react-app-rewired');
const rewireAliases = require('react-app-rewire-aliases');
const { paths } = require('react-app-rewired');
const path = require('path');

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
    config,
  );

  config = rewireAliases.aliasesOptions({
    '@public': path.resolve(__dirname, `${paths.appPublic}/`),
    '@src': path.resolve(__dirname, `${paths.appSrc}/`),
    '@common': path.resolve(__dirname, `${paths.appSrc}/common/`),
    '@http': path.resolve(__dirname, `${paths.appSrc}/http/`),
    '@pages': path.resolve(__dirname, `${paths.appSrc}/pages/`),
    '@service': path.resolve(__dirname, `${paths.appSrc}/service/`),
    '@store': path.resolve(__dirname, `${paths.appSrc}/store/`),
    '@router': path.resolve(__dirname, `${paths.appSrc}/router/`),
  })(config, env);

  return config;
};