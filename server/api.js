const api = (module.exports = require('express').Router());
// const products = require('./products');
// const reviews = require('./reviews');
// import products from './products';
// import portfolio from './portfolio'

api.get('/express-test', (req, res) => res.send({ express: 'working!' })); //demo route to prove api is working
// .use('/products', products)
// .use('/reviews', reviews)
api.use('/portfolio', require('./portfolio'));
api.use('/transactions', require('./transactions'));
// No routes matched? 404.
api.use((req, res) => res.status(404).end());
