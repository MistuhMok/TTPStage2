const api = (module.exports = require('express').Router());

api.use('/portfolio', require('./portfolio'));
api.use('/transactions', require('./transactions'));
// No routes matched? 404.
api.use((req, res) => res.status(404).end());
