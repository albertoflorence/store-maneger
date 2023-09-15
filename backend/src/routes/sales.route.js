const { Router } = require('express');
const { getAll, getById, create, deleteOne, update } = require('../controllers/sales.controller');
const v = require('../middlewares/validate.sales');

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', v.create, create);
router.delete('/:id', deleteOne);
router.put('/:saleId/products/:productId/quantity', v.update, update);

module.exports = router;
