import { axios } from '@http';

export const getIngressList = () => {
  // return axios.get(process.env.PUBLIC_URL + '/mock/ingresses.json');
  return axios.get('/ingresses');
};

export const saveIngress = (formData) => {
  const reqBody = {};
  ({
    type: reqBody.type,
    bind: reqBody.bind,
    port: reqBody.port,
    password: reqBody.password,
    method: reqBody.method
  } = formData);

  return axios.put(`/ingresses/${formData.name}`, reqBody);
};

export const deleteIngress = (ingressName) => {
  return axios.delete(`/ingresses/${ingressName}`);
};