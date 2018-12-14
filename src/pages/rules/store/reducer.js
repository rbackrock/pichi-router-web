import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  rulesFormModalVisible: false,

  fetchRulesListPending: false,
  fetchRulesListError: null,
  fetchRulesList: []
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_RULES_FORM_MODAL_VISIBLE:
      return state.set('rulesFormModalVisible', action.isVisible);
    case actionTypes.FETCH_RULES_BEGIN:
      return state.merge({
        fetchRulesListPending: true,
        fetchRulesListError: null
      });
    case actionTypes.FETCH_RULES_SUCCESS:
      return state.merge({
        fetchRulesListPending: false,
        fetchRulesListError: null,
        fetchRulesList: action.rulesList
      });
    case actionTypes.FETCH_RULES_FAILURE:
      return state.merge({
        fetchRulesListPending: false,
        fetchRulesListError: action.err
      });
    default:
      return state
  }
};
