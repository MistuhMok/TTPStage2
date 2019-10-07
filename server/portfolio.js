const Portfolio = require('../db/models/portfolio');

const router = require('express').Router();

router.get('/', async (req, res, next) => {
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
  const ticker = req.body.ticker;
  const userId = req.session.passport.user;
  req.body.userId = userId;

  const foundItem = await Portfolio.findOne({ where: { ticker, userId } });
  if (!foundItem) {
    // Item not found, create a new one
    const item = await Portfolio.create(req.body);
    res.json({ item, created: true });
  } else {
    // Found an item, update it
    const quantity = +foundItem.dataValues.quantity + +req.body.quantity;
    const updatedQuantity = {
      quantity,
    };

    let item;

    if (quantity === 0) {
      await foundItem.destroy();
      item = foundItem.dataValues;
      item.quantity = quantity;
    } else {
      const newItem = await Portfolio.update(updatedQuantity, {
        where: { ticker, userId },
        returning: true,
      });
      item = newItem[1][0];
      console.log(item, 'post route item');
    }
    res.json({ item, created: false });
  }
});

module.exports = router;
