import axios from 'axios';

const GET_PORTFOLIO = 'GET_PORTFOLIO';
const TRANSACT_STOCK = 'TRANSACT_STOCK';

const defaultPortfolio = [];

const getPortfolio = portfolio => ({ type: GET_PORTFOLIO, portfolio });
const updatePortfolio = (transaction, newStock, updatedFunds) => ({
  type: TRANSACT_STOCK,
  transaction,
  newStock,
  updatedFunds,
});

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
    const updateAmount = transaction.quantity * transaction.price;
    console.log(transaction, 'INSIDE THE THUNK');
    const payload = await axios.all([
      axios.post('/api/portfolio', transaction),
      axios.post('/api/transactions', transaction),
      //should check if transaction went through before updating funds
      axios.put('/auth/updateFunds', { updateAmount }),
    ]);

    console.log(payload, 'thunk after routes');
    let newTicker, newPrice, newQuantity;

    if (payload[0].data.created) {
      const { ticker, price, quantity } = payload[1].data;
      [newTicker, newPrice, newQuantity] = [ticker, price, quantity];
    } else {
      const { ticker, price, quantity } = payload[0].data.item;
      [newTicker, newPrice, newQuantity] = [ticker, price, quantity];
    }
    const newStock = {
      ticker: newTicker,
      price: newPrice,
      quantity: newQuantity,
    };

    const updatedFunds = payload[2].data[1][0].funds;

    dispatch(updatePortfolio(newStock, payload[0].data.created, updatedFunds));
  } catch (err) {
    return dispatch(updatePortfolio({ error: err }));
  }
};

export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return action.portfolio;
    case TRANSACT_STOCK: {
      //If stock is new just add to the portfolio
      if (action.newStock) return [...state, action.transaction];
      //If stock was deleted remove from portfolio
      else if (action.transaction.quantity === 0) {
        return state.filter(
          stock => stock.ticker !== action.transaction.ticker
        );
      }
      //If stock exists updating existing
      else {
        const newState = state.map(stock => {
          if (stock.ticker === action.transaction.ticker)
            return action.transaction;
          return stock;
        });
        return newState;
      }
    }
    default:
      return state;
  }
}
