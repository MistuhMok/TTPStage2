const db = require('../db');
const { User, Portfolio } = require('./models');
const { green, yellow, red } = require('chalk');

//  db.didSync
//    .then(() => db.sync({force: true}))
//    .then(seedProducts)
//    .then(products => console.log(`Seeded ${products.length} products OK`))
//    .then(seedReviews)
//    .then(reviews => console.log(`Seeded ${reviews.length} reviews OK`))
//    .catch(error => console.error(error))
//    .finally(() => db.close())

const seedUsers = [
  {
    email: 'email@email.com',
    name: 'Alex Mok',
    password: 'password',
  },
  {
    email: 'cody@email.com',
    name: 'Cody Pup',
    password: '12345',
  },
];

const seedPortfolios = [
  {
    ticker: 'MSFT',
    quantity: '10',
    price: 10000,
    userId: 2,
  },
  {
    ticker: 'FB',
    quantity: '5',
    price: 20000,
    userId: 2,
  },
  {
    ticker: 'AMZN',
    quantity: '1',
    price: 17242,
    userId: 2,
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    await User.create(seedUsers[0]);
    console.log(yellow('Seeded 1st User'));

    await User.create(seedUsers[1]);
    console.log(yellow('Seeded 2nd User'));

    for (let i = 0; i < seedPortfolios.length; i++) {
      await Portfolio.create(seedPortfolios[i]);
    }
    console.log(yellow('Seeded Portfolio'));

    console.log(green('Seeding success!'));
    db.close();
  } catch (err) {
    console.error(red('Something went wrong!'));
    console.error(err);
    db.close();
  }
};

seed();
