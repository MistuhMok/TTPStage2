import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import stock from './stock';
import portfolio from './portfolio';
import transactions from './transactions';

const Reducers = combineReducers({
  routing: routerReducer,
  user,
  stock,
  portfolio,
  transactions,
});

export default Reducers;
export * from './user';
export * from './stock';
export * from './portfolio';
export * from './transactions';
