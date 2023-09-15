const { Router } = require('express');
const {
  getAll,
  getById,
  create,
  update,
  deleteOne,
} = require('../controllers/products.controller');
const v = require('../middlewares/validate.product');

const router = Router();

router.get('/', getAll);
router.get('/search', getAll);
router.get('/:id', getById);
router.post('/', v.create, create);
router.put('/:id', v.update, update);
router.delete('/:id', deleteOne);

module.exports = router;
