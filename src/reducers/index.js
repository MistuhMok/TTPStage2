import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const Reducers = combineReducers({
  routing: routerReducer,
});

export default Reducers;
