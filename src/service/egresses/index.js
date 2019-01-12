import { axios } from '@http';
import { helper } from '@common/utils';

export const getEgressesList = () => {
  return new Promise((resolve, reject) => {
    axios.get('/egresses').then(rsp => {
      const DEFAULT_EGRESS_NAME = 'direct';
      const egressesData = helper.convertObjectsToArray(rsp.data);

      // 不管有多少出口，让默认给的 direct 排在第一
      for (let i = 0; i < egressesData.length; i++) {
        let currEgress = egressesData[i];
        if (currEgress.name === DEFAULT_EGRESS_NAME) {
          helper.swapArrayItem(egressesData, i, 0);
          break;
        }
      }

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
    method: reqBody.method,
    mode: reqBody.mode,
    delay: reqBody.delay
  } = formData);

  return axios.put(`/egresses/${formData.name}`, reqBody);
};
