import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
  egressesList: [],
  rulesList: [],
  defaultEgress: 'direct',

  fetchRoutesPending: false,
  fetchRoutesError: null,
  routesList: [],

  saveRoutesPending: false,
  saveRoutesError: null,

  routesFormModalVisible: false,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ROUTES_BEGIN:
      return state.merge({
        fetchRoutesPending: true,
        fetchRoutesError: null
      });
    case actionTypes.FETCH_ROUTES_SUCCESS:
      return state.merge({
        fetchRoutesPending: false,
        fetchRoutesError: null,
        egressesList: fromJS(action.egressesList),
        rulesList: fromJS(action.rulesList),
        defaultEgress: action.defaultEgress,
        routesList: fromJS(action.routesList)
      });
    case actionTypes.FETCH_ROUTES_FAILURE:
      return state.merge({
        fetchRoutesPending: false,
        fetchRoutesError: action.err
      });
    case actionTypes.SAVE_ROUTES_BEGIN:
      return state.merge({
        saveRoutesPending: true,
        saveRoutesError: null
      });
    case actionTypes.SAVE_ROUTES_SUCCESS:
      return state.merge({
        saveRoutesPending: false,
        saveRoutesError: null
      });
    case actionTypes.SAVE_ROUTES_FAILURE:
      return state.merge({
        saveRoutesPending: false,
        saveRoutesError: action.err
      });
    case actionTypes.CHANGE_ROUTES_FORM_MODAL_VISIBLE:
      return state.merge({
        routesFormModalVisible: action.isVisible,
      });
    default:
      return state;
  }
};
