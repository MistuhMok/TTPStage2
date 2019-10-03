import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';

const Reducers = combineReducers({
  routing: routerReducer,
  user: user,
});

export default Reducers;
export * from './user';
