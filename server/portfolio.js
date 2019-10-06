const Portfolio = require('../db/models/portfolio');

const router = require('express').Router();

router.get('/', async (req, res, next) => {
  console.log(req, 'get route');
  try {
    res.json(
      await Portfolio.findAll({
        where: { user_id: req.session.passport.user },
      })
    );
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  console.log('fake post route');
});

module.exports = router;
