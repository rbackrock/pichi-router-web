import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';
import egressesAdapterTypeList from '@common/resource/egressesAdapterType';

const defaultState = fromJS({
  egressesFormModalVisible: false,
  adapterType: egressesAdapterTypeList[0],

  fetchEgressesListPending: false,
  fetchEgressesError: null,
  fetchEgressesList: [],

  deleteEgressesPending: false,
  deleteEgressesError: null,

  saveEgressesPending: false,
  saveEgressesError: false,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_EGRESSES_FORM_MODAL_VISIBLE:
      return state.set('egressesFormModalVisible', action.isVisible);
    case actionTypes.CHANGE_EGRESSES_FORM_ADAPTER_TYPE:
      return state.set('adapterType', action.adapterType);
    case actionTypes.FETCH_EGRESSES_BEGIN:
      return state.merge({
        fetchEgressesListPending: true,
        fetchEgressesError: null
      });
    case actionTypes.FETCH_EGRESSES_SUCCESS:
      return state.merge({
        fetchEgressesListPending: false,
        fetchEgressesError: null,
        fetchEgressesList: action.egressesList
      });
    case actionTypes.FETCH_EGRESSES_FAILURE:
      return state.merge({
        fetchEgressesListPending: false,
        fetchEgressesError: action.err
      });
    case actionTypes.DELETE_EGRESSES_BEGIN:
      return state.merge({
        deleteEgressesPending: true,
        deleteEgressesError: null
      });
    case actionTypes.DELETE_EGRESSES_SUCCESS:
      return state.merge({
        deleteEgressesPending: false,
        deleteEgressesError: null
      });
    case actionTypes.DELETE_EGRESSES_FAILURE:
      return state.merge({
        deleteEgressesPending: false,
        deleteEgressesError: action.err
      });
    case actionTypes.SAVE_EGRESSES_BEGIN:
      return state.merge({
        saveEgressesPending: true,
        saveEgressesError: false,
      });
    case actionTypes.SAVE_EGRESSES_SUCCESS:
      return state.merge({
        saveEgressesPending: false,
        saveEgressesError: false,
      });
    case actionTypes.SAVE_EGRESSES_FAILURE:
      return state.merge({
        saveEgressesPending: false,
        saveEgressesError: action.err,
      });
    default:
      return state;
  }
}