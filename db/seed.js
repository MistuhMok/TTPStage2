const db = require('../db');
const { User } = require('./models');
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

const seed = async () => {
  try {
    await db.sync({ force: true });

    await User.create(seedUsers[0]);
    console.log(yellow('Seeded 1st User'));

    console.log(green('Seeding success!'));
    db.close();
  } catch (err) {
    console.error(red('Something went wrong!'));
    console.error(err);
    db.close();
  }
};

seed();
