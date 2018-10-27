import ajax from 'axios';
import { storage } from '@common/utils';
import _ from 'lodash';

const globalConfig = {

};

const ajaxInstance = ajax.create(globalConfig);

ajaxInstance.interceptors.request.use(config => {
  const baseUrl = storage.session.get('baseUrl');

  if (baseUrl) {
    config.baseURL = baseUrl;
    return config;
  } else {
    return Promise.reject();
  }
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