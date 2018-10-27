import * as actionTypes from './actionTypes';
import * as egressesService from '@service/egresses';
import { fromJS } from 'immutable';
import { helper } from '@common/utils';

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
      egressesService.getEgressesList().then(rsp => {
        const egressesData = helper.convertObjectsToArray(rsp.data, ['direct']);
        dispatch({
          type: actionTypes.FETCH_EGRESSES_SUCCESS,
          egressesList: fromJS(egressesData)
        });
        resolve(rsp);
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
      egressesService.deleteEgresses(name).then(rsp => {
        dispatch({
          type: actionTypes.DELETE_EGRESSES_SUCCESS
        });
        resolve(rsp);
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
      egressesService.saveEgresses(formData).then(rsp => {
        dispatch({
          type: actionTypes.SAVE_EGRESSES_SUCCESS
        });
        resolve(rsp);
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