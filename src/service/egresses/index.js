import { axios } from '@http';

export const getEgressesList = () => {
  return axios.get('/egresses');
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