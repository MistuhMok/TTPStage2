import axios from 'axios';
import history from '../index';

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const TRANSACT_STOCK = 'TRANSACT_STOCK';

const defaultUser = {};

const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method, name = '') => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { email, password, name });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push('/home');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER: {
      if (action.user.error) return action.user;
      const { id, email, name, funds } = action.user;
      const user = { id, email, name, funds };
      return user;
    }
    case REMOVE_USER:
      return defaultUser;
    case TRANSACT_STOCK:
      return { ...state, funds: action.updatedFunds };
    default:
      return state;
  }
}
