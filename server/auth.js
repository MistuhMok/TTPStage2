const router = require('express').Router();
const User = require('../db/models/user');
module.exports = router;

router.post('/signin', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || user.dataValues.password !== req.body.password) {
      res.status(401).send('Wrong username and/or password');
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.put('/updateFunds', async (req, res, next) => {
  const userId = req.session.passport.user;
  const user = await User.findByPk(userId);
  const updatedFunds = {
    funds: +user.dataValues.funds - +req.body.updateAmount,
  };

  res.json(
    await User.update(updatedFunds, {
      where: { id: req.session.passport.user },
      returning: true,
    })
  );
});
