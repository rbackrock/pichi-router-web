import * as actionTypes from './actionTypes';
import * as ingressService from '@service/ingress';

export function fetchIngressList() {
  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_INGRESS_LIST_BEGIN
    });

    return new Promise((resolve, reject) => {
      ingressService.getIngressList().then(ingressData => {
        dispatch({
          type: actionTypes.FETCH_INGRESS_LIST_SUCCESS,
          ingressList: ingressData
        });
      }, error => {
        dispatch({
          type: actionTypes.FETCH_INGRESS_LIST_FAILURE,
          err: error.errorSelf
        });
        reject(error);
      });
    });
  };
}

export function saveIngress(formData) {
  return dispatch => {
    dispatch({
      type: actionTypes.SAVE_INGRESS_BEGIN
    });

    return new Promise((resolve, reject) => {
      ingressService.saveIngress(formData).then(() => {
        dispatch({
          type: actionTypes.SAVE_INGRESS_SUCCESS
        });
        resolve();
      }, error => {
        dispatch({
          type: actionTypes.SAVE_INGRESS_FAILURE,
          err: error.errorSelf
        });
        reject(error);
      });
    });
  };
}

export const changeIngressFormModalVisible = (isVisible) => ({
  type: actionTypes.CHANGE_INGRESS_FORM_MODAL_VISIBLE,
  isVisible
});

export function deleteIngress(name) {
  return dispatch => {
    dispatch({
      type: actionTypes.DELETE_INGRESS_BEGIN
    });

    return new Promise((resolve, reject) => {
      ingressService.deleteIngress(name).then(() => {
        dispatch({
          type: actionTypes.DELETE_INGRESS_SUCCESS
        });
        resolve();
      }, error => {
        dispatch({
          type: actionTypes.DELETE_INGRESS_FAILURE,
          err: error.errorSelf
        });
        reject(error);
      });
    });
  };
}

export const changeIngressFormAdapterType = (adapterType) => ({
  type: actionTypes.CHANGE_INGRESS_FORM_ADDRESS_TYPE,
  adapterType
});
