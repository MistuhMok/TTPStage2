import axios from 'axios';

const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
const TRANSACT_STOCK = 'TRANSACT_STOCK';

const defaultTransactions = [];

const getTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions,
});

export const fetchTransactions = () => async dispatch => {
  try {
    const { data } = await axios.get(`/api/transactions`);

    const transactions = data.map(transaction => {
      return {
        ticker: transaction.ticker,
        price: transaction.price,
        quantity: transaction.quantity,
      };
    });

    dispatch(getTransactions(transactions || defaultTransactions));
  } catch (err) {
    return dispatch(getTransactions({ error: err }));
  }
};

export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transactions;
    case TRANSACT_STOCK:
      return [...state, action.transaction];
    default:
      return state;
  }
}
