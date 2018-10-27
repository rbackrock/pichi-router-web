import { combineReducers } from 'redux-immutable';
import { reducer as globalReducer } from '@common/store'
import { reducer as ingressReducer } from '@pages/ingress/store'
import { reducer as egressesReducer } from '@pages/egresses/store'

const reducer = combineReducers({
  global: globalReducer,
  ingress: ingressReducer,
  egresses: egressesReducer
});

export default reducer;