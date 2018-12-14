import { axios } from '@http';

export const getRulesList = () => {
  return axios.get('/rules');
};

export const saveRule = (formValue) => {
  console.log(formValue);
};
