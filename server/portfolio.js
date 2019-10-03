const db = require('../db'); //this is required
const Portfolio = require('../db/models/portfolio');
const Transaction = require('../db/models/transaction');

const router = require('express').Router();

router.get('/', async (req, res, next) => {
  console.log(req, 'get route');
  try {
    res.json(
      await Portfolio.findAll({
        where: { user_id: 1 },
      })
    );
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  console.log('fake post route');
});

// router.get('/', function(req, res, next) {
//     Product.findAll({
//             include: [Review]
//         })
//         .then(result => {
//             res.status(200).send(result);
//         })
//         .catch(next);
// });

// router.get('/:id', function(req, res, next) {
//     Product.findOne({
//             where:{id:req.params.id},
//             include: [Review]
//         })
//         .then(result => {
//             res.status(200).send(result);
//         })
//         .catch(next);
// });

module.exports = router;
