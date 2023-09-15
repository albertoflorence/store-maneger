const { Router } = require('express');
const { getAll, getById, create, update } = require('../controllers/products.controller');
const v = require('../middlewares/validate.product');

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', v.create, create);
router.put('/:id', v.update, update);

module.exports = router;
