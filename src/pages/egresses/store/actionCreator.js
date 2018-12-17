import * as actionTypes from './actionTypes';
import * as egressesService from '@service/egresses';

export const changeEgressesFormModalVisible = (isVisible) => ({
  type: actionTypes.CHANGE_EGRESSES_FORM_MODAL_VISIBLE,
  isVisible
});

export const changeEgressesFormAdapterType = (adapterType) => ({
  type: actionTypes.CHANGE_EGRESSES_FORM_ADAPTER_TYPE,
  adapterType
});

export function fetchEgresses() {
  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_EGRESSES_BEGIN
    });

    return new Promise((resolve, reject) => {
      egressesService.getEgressesList().then(egressesData => {
        dispatch({
          type: actionTypes.FETCH_EGRESSES_SUCCESS,
          egressesList: egressesData
        });
      }, error => {
        dispatch({
          type: actionTypes.FETCH_EGRESSES_FAILURE,
          err: error.errorSelf
        });
        reject(error);
      });
    });
  };
}

export function deleteEgresses(name) {
  return dispatch => {
    dispatch({
      type: actionTypes.DELETE_EGRESSES_BEGIN
    });

    return new Promise((resolve, reject) => {
      egressesService.deleteEgresses(name).then(() => {
        dispatch({
          type: actionTypes.DELETE_EGRESSES_SUCCESS
        });
        resolve();
      }, error => {
        dispatch({
          type: actionTypes.DELETE_EGRESSES_FAILURE,
          err: error.errorSelf
        });
        reject(error);
      });
    });
  };
}

export function saveEgresses(formData) {
  return dispatch => {
    dispatch({
      type: actionTypes.SAVE_EGRESSES_BEGIN
    });

    return new Promise((resolve, reject) => {
      egressesService.saveEgresses(formData).then(() => {
        dispatch({
          type: actionTypes.SAVE_EGRESSES_SUCCESS
        });
        resolve();
      }, error => {
        dispatch({
          type: actionTypes.SAVE_EGRESSES_FAILURE,
          err: error.errorSelf
        });
        reject(error);
      });
    });
  };
}
