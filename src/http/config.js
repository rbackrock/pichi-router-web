import ajax from 'axios';
import _ from 'lodash';

const globalConfig = {

};

const ajaxInstance = ajax.create(globalConfig);

ajaxInstance.interceptors.request.use(config => {
  config.baseURL = '/api';
  return config;
}, error => {
  return Promise.reject(error);
});

ajaxInstance.interceptors.response.use(rsp => {
  return rsp;
}, error => {
  if (_.isObject(error.response.data) && error.response.data.hasOwnProperty('message')) {
    return Promise.reject({errorSelf: error, errMsg: error.response.data.message});
  }

  return Promise.reject({errorSelf: error, errMsg: 'network error'});
});

export default ajaxInstance;
