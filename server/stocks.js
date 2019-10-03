const router = require('express').Router();

const API_KEY = 'ZUV0KJDB9DUAX41K';
const axios = require('axios');

router.get('/:ticker', async (req, res, next) => {
  const ticker = req.params.ticker;
  const data = await axios.get(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`
  );

  console.log(data, 'ticker');
  req.status(data.status).send(data.data);
});
