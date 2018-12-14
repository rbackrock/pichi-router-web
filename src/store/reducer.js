import { combineReducers } from 'redux-immutable';
import { reducer as globalReducer } from '@common/store';
import { reducer as ingressReducer } from '@pages/ingress/store';
import { reducer as egressesReducer } from '@pages/egresses/store';
import { reducer as rulesReducer } from '@pages/rules/store';

const reducer = combineReducers({
  global: globalReducer,
  ingress: ingressReducer,
  egresses: egressesReducer,
  rules: rulesReducer
});

export default reducer;
