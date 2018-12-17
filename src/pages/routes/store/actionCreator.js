import * as actionTypes from './actionTypes';
import * as routesService from '@service/routes';

export function fetchRoutes() {
  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_ROUTES_BEGIN
    });

    return new Promise((resolve, reject) => {
      routesService.getRoutesList().then(result => {
        dispatch({
          type: actionTypes.FETCH_ROUTES_SUCCESS,
            egressesList: result.egressesList,
            rulesList: result.rulesList,
            defaultEgress: result.defaultEgress,
            routesList: result.routesList,
        });
        resolve(result);
      }, error => {
        dispatch({
          type: actionTypes.FETCH_ROUTES_FAILURE,
          err: error.errorSelf
        });
        reject(error);
      });
    });
  };
}

export function saveRoutes(defaultEgress, routesList) {
  return dispatch => {
    dispatch({
      type: actionTypes.SAVE_ROUTES_BEGIN
    });

    return new Promise((resolve, reject) => {
      routesService.saveRoutes(defaultEgress, routesList).then(() => {
        dispatch({
          type: actionTypes.SAVE_ROUTES_SUCCESS
        });
        resolve();
      }, error => {
        dispatch({
          type: actionTypes.SAVE_ROUTES_FAILURE,
          err: error.errorSelf
        });
        reject(error);
      });
    });
  };
}

export const changeRoutesFormModalVisible = (isVisible) => ({
  type: actionTypes.CHANGE_ROUTES_FORM_MODAL_VISIBLE,
  isVisible
});
