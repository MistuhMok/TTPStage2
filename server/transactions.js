const Transaction = require('../db/models/transaction');

const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(
      await Transaction.findAll({
        where: { user_id: req.session.passport.user },
      })
    );
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const userId = req.session.passport.user;
  req.body.userId = userId;

  try {
    res.json(await Transaction.create(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
