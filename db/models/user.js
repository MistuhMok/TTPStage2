'use strict';

const Sequelize = require('sequelize');
const db = require('../index.js');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
  },
  funds: {
    type: Sequelize.INTEGER,
    defaultValue: 50000,
    validate: { min: 0 },
  },
});

module.exports = User;
