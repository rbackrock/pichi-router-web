import { axios } from '@http';
import _ from 'lodash';

export const getRulesList = () => {
  return axios.get('/rules');
};

export const saveRule = (formValue) => {
  const formBody = {};
  let ruleName = '';

  // 拼装符合 API 规定的数据格式
  _.forIn(formValue, (val, key) => {
    if (key.search('Keys') === -1) {
      if (_.isString(val)) {
        ruleName = val;
      } else if (_.isArray(val)) {
        if (val.length > 0 && val[0] !== undefined) {
          formBody[key] = val;
        }
      }
    }
  });

  return axios.put(`/rules/${ruleName}`, formBody);
};
