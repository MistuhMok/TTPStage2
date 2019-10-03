import axios from 'axios';

const GET_PORTFOLIO = 'GET_PORTFOLIO';

const defaultPortfolio = [];

const getPortfolio = portfolio => ({ type: GET_PORTFOLIO, portfolio });

export const fetchPortfolio = () => async dispatch => {
  try {
    const { data } = await axios.get(`/api/portfolio`);
    console.log(data, 'FETCH THUNK');

    dispatch(getPortfolio(data || defaultPortfolio));
  } catch (err) {
    console.log('is this erroring?');

    return dispatch(getPortfolio({ error: err }));
  }
};

export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return action.portfolio;
    default:
      return state;
  }
}
