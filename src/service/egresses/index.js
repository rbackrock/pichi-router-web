import { axios } from '@http';
import { helper } from '@common/utils';

export const getEgressesList = () => {
  return new Promise((resolve, reject) => {
    axios.get('/egresses').then(rsp => {
      const egressesData = helper.convertObjectsToArray(rsp.data, ['direct']);
      resolve(egressesData);
    }, error => reject(error));
  });
};

export const deleteEgresses = (name) => {
  return axios.delete(`/egresses/${name}`);
};

export const saveEgresses = (formData) => {
  const reqBody = {};
  ({
    type: reqBody.type,
    host: reqBody.host,
    port: reqBody.port,
    password: reqBody.password,
    method: reqBody.method
  } = formData);

  return axios.put(`/egresses/${formData.name}`, reqBody);
};
