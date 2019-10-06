import axios from 'axios';

const GET_PORTFOLIO = 'GET_PORTFOLIO';
const TRANSACT_STOCK = 'TRANSACT_STOCK';

const defaultPortfolio = [];

const getPortfolio = portfolio => ({ type: GET_PORTFOLIO, portfolio });
const updatePortfolio = transaction => ({ type: TRANSACT_STOCK, transaction });

export const fetchPortfolio = () => async dispatch => {
  try {
    const { data } = await axios.get(`/api/portfolio`);

    const portfolio = data.map(stock => {
      return {
        ticker: stock.ticker,
        price: stock.price,
        quantity: stock.quantity,
      };
    });

    dispatch(getPortfolio(portfolio || defaultPortfolio));
  } catch (err) {
    return dispatch(getPortfolio({ error: err }));
  }
};

export const transactStock = transaction => async dispatch => {
  try {
    console.log(transaction, 'TRANSACT STOCK THUNK');
    const payload = await axios.post('/api/portfolio', transaction);
    console.log(payload, 'PAYLOAD');
    const { data } = await axios.post('/api/transactions', transaction);
    console.log(data);
    const { ticker, price, quantity } = data;
    const newStock = { ticker, price, quantity };

    dispatch(updatePortfolio(newStock));
  } catch (err) {
    return dispatch(updatePortfolio({ error: err }));
  }
};

export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return action.portfolio;
    case TRANSACT_STOCK:
      return [...state, action.transaction];
    default:
      return state;
  }
}
