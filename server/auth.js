const router = require('express').Router();
const User = require('../db/models/user');
module.exports = router;

router.post('/signin', async (req, res, next) => {
  console.log('/auth/signin');
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    console.log(user, 'USER LOGIN ROUTE');
    if (!user || user.dataValues.password !== req.body.password) {
      res.status(401).send('Wrong username and/or password');
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});
