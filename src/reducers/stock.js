import axios from 'axios';

const GET_STOCK = 'GET_STOCK';

const defaultStock = {};

const getStock = stock => ({ type: GET_STOCK, stock });

export const fetchData = ticker => async dispatch => {
  try {
    const { data } = await axios.get(`/stocks/${ticker}`);
    console.log(data, 'FETCH THUNK');

    dispatch(getStock(data['Global Quote'] || defaultStock));
  } catch (err) {
    console.log('is this erroring?');

    return dispatch(getStock({ error: err }));
  }
};

export default function(state = defaultStock, action) {
  switch (action.type) {
    case GET_STOCK:
      return action.stock;
    default:
      return state;
  }
}
