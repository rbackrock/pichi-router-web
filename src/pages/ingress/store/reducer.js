import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';
import ingressAdapterTypeList from '@common/resource/ingressAdapterType';

const defaultState = fromJS({
  adapterType: ingressAdapterTypeList[0],
  ingressFormModalVisible: false,

  fetchIngressListPending: false,
  fetchIngressListError: null,
  fetchIngressList: [],

  saveIngressPending: false,
  saveIngressError: null,

  deleteIngressPending: false,
  deleteIngressError: null,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_INGRESS_LIST_BEGIN:
      return state.merge({
        fetchIngressListPending: true,
        fetchIngressListError: null
      });
    case actionTypes.FETCH_INGRESS_LIST_SUCCESS:
      return state.merge({
        fetchIngressListPending: false,
        fetchIngressListError: null,
        fetchIngressList: fromJS(action.ingressList),
      });
    case actionTypes.FETCH_INGRESS_LIST_FAILURE:
      return state.merge({
        fetchIngressListPending: false,
        fetchIngressListError: action.err
      });
    case actionTypes.SAVE_INGRESS_BEGIN:
      return state.merge({
        saveIngressPending: true,
        saveIngressError: null
      });
    case actionTypes.SAVE_INGRESS_SUCCESS:
      return state.merge({
        saveIngressPending: false,
        saveIngressError: null
      });
    case actionTypes.SAVE_INGRESS_FAILURE:
      return state.merge({
        saveIngressPending: false,
        saveIngressError: action.err
      });
    case actionTypes.DELETE_INGRESS_BEGIN:
      return state.merge({
        deleteIngressPending: true,
        deleteIngressError: null
      });
    case actionTypes.DELETE_INGRESS_SUCCESS:
      return state.merge({
        deleteIngressPending: false,
        deleteIngressError: null
      });
    case actionTypes.DELETE_INGRESS_FAILURE:
      return state.merge({
        deleteIngressPending: false,
        deleteIngressError: action.err
      });
    case actionTypes.CHANGE_INGRESS_FORM_MODAL_VISIBLE:
      return state.set('ingressFormModalVisible', action.isVisible);
    case actionTypes.CHANGE_INGRESS_FORM_ADDRESS_TYPE:
      return state.set('adapterType', action.adapterType);
    default:
      return state;
  }
}
