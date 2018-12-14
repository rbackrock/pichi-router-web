import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  rulesFormModalVisible: false,

  fetchRulesListPending: false,
  fetchRulesListError: null,
  fetchRulesList: [],

  saveRulesPending: false,
  saveRulesError: null,

  deleteRulesPending: false,
  deleteRulesError: null
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
    case actionTypes.SAVE_RULES_BEGIN:
      return state.merge({
        saveRulesPending: true,
        saveRulesError: null
      });
    case actionTypes.SAVE_RULES_SUCCESS:
      return state.merge({
        saveRulesPending: false,
        saveRulesError: null
      });
    case actionTypes.SAVE_RULES_FAILURE:
      return state.merge({
        saveRulesPending: false,
        saveRulesError: action.err
      });
    case actionTypes.DELETE_RULES_BEGIN:
      return state.merge({
        deleteRulesPending: true,
        deleteRulesError: null
      });
    case actionTypes.DELETE_RULES_SUCCESS:
      return state.merge({
        deleteRulesPending: false,
        deleteRulesError: null
      });
    case actionTypes.DELETE_RULES_FAILURE:
      return state.merge({
        deleteRulesPending: false,
        deleteRulesError: action.err
      });
    default:
      return state
  }
};
