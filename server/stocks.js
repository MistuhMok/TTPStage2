const router = require('express').Router();
module.exports = router;

const API_KEY = 'ZUV0KJDB9DUAX41K';
const axios = require('axios');

router.get('/:ticker', async (req, res, next) => {
  const ticker = req.params.ticker;
  const { data } = await axios.get(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`
  );

  console.log(data['Error Message'], 'ticker');

  if (data['Error Message']) res.status(400).send('Ticker is invalid');
  else {
    res.status(200).send(data);
  }
});
