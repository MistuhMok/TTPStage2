import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import stock from './stock';

const Reducers = combineReducers({
  routing: routerReducer,
  user: user,
  stock: stock,
});

export default Reducers;
export * from './user';
export * from './stock';
