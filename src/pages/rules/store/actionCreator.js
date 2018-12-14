import * as actionTypes from './actionTypes';
import * as rulesService from '@service/rules';
import { fromJS } from 'immutable';
import { helper } from '@common/utils';

export function fetchRules() {
  return dispatch => {
    dispatch({
      type: actionTypes.FETCH_RULES_BEGIN
    });

    return new Promise((resolve, reject) => {
      rulesService.getRulesList().then(rsp => {
        const rulesData = helper.convertObjectsToArray(rsp.data);
        dispatch({
          type: actionTypes.FETCH_RULES_SUCCESS,
          rulesList: fromJS(rulesData)
        });
        resolve(rsp);
      }, error => {
        dispatch({
          type: actionTypes.FETCH_RULES_FAILURE,
          err: error.errorSelf
        });
        reject(error);
      });
    });
  };
}

export const changeRulesFormModalVisible = (isVisible) => ({
  type: actionTypes.CHANGE_RULES_FORM_MODAL_VISIBLE,
  isVisible
});
