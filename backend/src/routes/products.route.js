const { Router } = require('express');
const { getAll, getById, create } = require('../controllers/products.controller');
const v = require('../middlewares/validate.product');

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', v.create, create);

module.exports = router;
