const User = require('./user');
const Portfolio = require('./portfolio');
const Transaction = require('./transaction');

// Product.hasMany(Review);
// Review.belongsTo(Product);
User.hasMany(Transaction);
Portfolio.belongsTo(User);

module.exports = {
  User,
  Portfolio,
  Transaction,
};
