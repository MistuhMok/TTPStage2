const User = require('./user');
const Portfolio = require('./portfolio');
const Transaction = require('./transaction');

User.hasMany(Transaction);
Portfolio.belongsTo(User);
User.hasMany(Portfolio);

module.exports = {
  User,
  Portfolio,
  Transaction,
};
