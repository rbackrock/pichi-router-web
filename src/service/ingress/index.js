import { axios } from '@http';
import { helper } from '@common/utils';

export const getIngressList = () => {
  return new Promise((resolve, reject) => {
    axios.get('/ingresses').then(rsp => {
      const ingressData = helper.convertObjectsToArray(rsp.data);
      resolve(ingressData, rsp);
    }, error => reject(error));
  });
};

export const saveIngress = (formData) => {
  const reqBody = {};
  ({
    type: reqBody.type,
    bind: reqBody.bind,
    port: reqBody.port,
    password: reqBody.password,
    method: reqBody.method,
    destinations: reqBody.destinations,
    balance: reqBody.balance
  } = formData);

  return axios.put(`/ingresses/${formData.name}`, reqBody);
};

export const deleteIngress = (ingressName) => {
  return axios.delete(`/ingresses/${ingressName}`);
};
