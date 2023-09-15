const { Router } = require('express');
const { getAll, getById, create, deleteOne } = require('../controllers/sales.controller');
const v = require('../middlewares/validate.sales');

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', v.create, create);
router.delete('/:id', deleteOne);

module.exports = router;
